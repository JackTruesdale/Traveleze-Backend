import { Module } from '@nestjs/common';
import { TravelController } from './travel.controller';
import { TravelService } from './travel.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelSchema } from './travel.model';

@Module({
  //imports: [ProductModule],
   imports: [MongooseModule.forFeature([{ name: 'Travel', schema: TravelSchema }])],
  controllers: [TravelController],
  providers: [TravelService]
})
export class TravelModule { }