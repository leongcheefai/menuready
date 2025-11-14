import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {
  TransformImageDto,
  ImageQuality,
  ImageFormat,
} from './dto/transform-image.dto';
import { TransformResponseDto } from './dto/transform-response.dto';

@Injectable()
export class ImagesService {
  private readonly logger = new Logger(ImagesService.name);
  private readonly uploadDir: string;
  private readonly genAI: GoogleGenerativeAI;

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get<string>('UPLOAD_DIR') || 'uploads';
    const geminiApiKey = this.configService.get<string>('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    this.genAI = new GoogleGenerativeAI(geminiApiKey);

    // Ensure upload directory exists
    this.ensureUploadDirectory();
  }

  private ensureUploadDirectory(): void {
    const uploadPath = path.join(process.cwd(), this.uploadDir);
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
      this.logger.log(`Created upload directory: ${uploadPath}`);
    }
  }

  async transformImage(dto: TransformImageDto): Promise<TransformResponseDto> {
    const startTime = Date.now();

    try {
      // Decode base64 image
      const imageBuffer = Buffer.from(dto.image, 'base64');
      const originalSize = imageBuffer.length;

      this.logger.log(
        `Processing image transformation. Original size: ${originalSize} bytes`,
      );

      // Call Gemini Nano Banana API
      const transformedImageBuffer = await this.callGeminiApi(
        imageBuffer,
        dto.prompt,
        dto.quality,
        dto.format,
      );

      // Generate unique filename
      const filename = this.generateFilename(dto.format);
      const filePath = path.join(this.uploadDir, filename);
      const absolutePath = path.join(process.cwd(), filePath);

      // Save transformed image
      fs.writeFileSync(absolutePath, transformedImageBuffer);

      const processingTime = Date.now() - startTime;
      const transformedSize = transformedImageBuffer.length;

      this.logger.log(
        `Image transformation completed in ${processingTime}ms. Saved to: ${filePath}`,
      );

      // Build response
      const response: TransformResponseDto = {
        success: true,
        filePath: `/${filePath}`,
        url: `http://localhost:3000/${filePath}`,
        metadata: {
          originalSize,
          transformedSize,
          format: dto.format,
          quality: dto.quality,
          prompt: dto.prompt,
          processingTimeMs: processingTime,
        },
      };

      return response;
    } catch (error) {
      this.logger.error(
        `Image transformation failed: ${error.message}`,
        error.stack,
      );
      throw new HttpException(
        `Image transformation failed: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async callGeminiApi(
    imageBuffer: Buffer,
    prompt: string,
    quality: ImageQuality,
    format: ImageFormat,
  ): Promise<Buffer> {
    try {
      this.logger.log(
        `Calling Google Generative AI (gemini-2.5-flash-image) with prompt: "${prompt}"`,
      );

      // Use Gemini 2.5 Flash Image model for image transformation
      const model = this.genAI.getGenerativeModel({
        model: 'gemini-2.5-flash-image',
      });

      // Convert image buffer to base64
      const base64Image = imageBuffer.toString('base64');

      // Determine MIME type based on the image buffer (simple detection)
      const mimeType = this.detectMimeType(imageBuffer);

      // Generate transformed image using both the uploaded image and text prompt
      const result = await model.generateContent([
        {
          inlineData: {
            data: base64Image,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ]);

      const response = await result.response;

      // Get the generated image
      if (
        !response ||
        !response.candidates ||
        response.candidates.length === 0
      ) {
        throw new Error('No image generated from Gemini API');
      }

      const candidate = response.candidates[0];
      if (
        !candidate.content ||
        !candidate.content.parts ||
        candidate.content.parts.length === 0
      ) {
        throw new Error('Invalid response structure from Gemini API');
      }

      // Extract image data from the response
      const imagePart = candidate.content.parts.find((part) => part.inlineData);
      if (!imagePart || !imagePart.inlineData) {
        throw new Error('No image data in Gemini API response');
      }

      // Convert base64 response to buffer
      const transformedImageBuffer = Buffer.from(
        imagePart.inlineData.data,
        'base64',
      );

      this.logger.log(
        'Successfully received transformed image from Gemini API',
      );

      return transformedImageBuffer;
    } catch (error) {
      this.logger.error(
        `Gemini API request failed: ${error.message}`,
        error.stack,
      );
      throw new Error(`Gemini API error: ${error.message}`);
    }
  }

  private detectMimeType(buffer: Buffer): string {
    // Detect MIME type from the buffer's magic bytes
    if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
      return 'image/jpeg';
    } else if (
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47
    ) {
      return 'image/png';
    } else if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
      return 'image/gif';
    } else if (
      buffer[0] === 0x52 &&
      buffer[1] === 0x49 &&
      buffer[2] === 0x46 &&
      buffer[3] === 0x46
    ) {
      return 'image/webp';
    }
    // Default to JPEG if unable to detect
    return 'image/jpeg';
  }

  private generateFilename(format: ImageFormat): string {
    const timestamp = Date.now();
    const uuid = uuidv4();
    return `menu-photo-${timestamp}-${uuid}.${format}`;
  }
}
