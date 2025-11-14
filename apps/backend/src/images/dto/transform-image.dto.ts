import { IsBase64, IsEnum, IsOptional, IsString } from 'class-validator';

export enum ImageQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum ImageFormat {
  JPEG = 'jpeg',
  PNG = 'png',
  WEBP = 'webp',
}

export class TransformImageDto {
  @IsString()
  @IsBase64()
  image: string;

  @IsOptional()
  @IsString()
  prompt?: string =
    'extract the food out and turn it into a great production studio food photography for a restaurant menu';

  @IsOptional()
  @IsEnum(ImageQuality)
  quality?: ImageQuality = ImageQuality.HIGH;

  @IsOptional()
  @IsEnum(ImageFormat)
  format?: ImageFormat = ImageFormat.JPEG;
}
