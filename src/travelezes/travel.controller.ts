import { Controller, Post, Patch, Delete, Body, Get, Param } from '@nestjs/common';
import { TravelService } from './travel.service';

@Controller('travelezes')
export class TravelController {
    constructor(private readonly travelsService: TravelService) { }
    
    @Get()
    async getAllTravels() {
        const travels = await this.travelsService.getAllTravels();
        return travels;

        
    }
    

    @Post()
    async addProduct(
        @Body('dest') travelDest: string, 
        @Body('price') travelPrice: string,
        @Body('rating') travelRating: string, 
        @Body('amen') travelAmen: Array<string>, 
        @Body('dist') travelDist: string,
        ) {

        const generatedId = await this.travelsService.insertTravel(travelDest, travelPrice, travelRating, travelAmen, travelDist);
        return { id: generatedId };
    }

    @Get('/budget')
    async getAllBUDGETTravels() {
        const travels = await this.travelsService.getAllBudgetTravels();
        return travels;
    }

    @Get('/standard')
    async getAllSTANDARDTravels() {
        const travels = await this.travelsService.getAllStandardTravels();
        return travels;
    }

    @Get('/luxury')
    async getAllLUXURYTravels() {
        const travels = await this.travelsService.getAllLuxuryTravels();
        return travels;
    }
    

    @Get(':id')
    async getTravelById(@Param('id') travelId: string,) {
        const travel  = await this.travelsService.getTravelById(travelId);
    
        return travel;
    }

    @Patch(':id')
    async updateTravelById(
        @Param('id') travelId: string,
        @Body('dest') travelDest: string, 
        @Body('price') travelPrice: string,
        @Body('rating') travelRating: string, 
        @Body('amen') travelAmen: Array<string>, 
        @Body('dist') travelDist: string,
    ) {
        await this.travelsService.updateTravelById(travelId, travelDest, travelPrice, travelRating, travelAmen, travelDist);
        return null;
    }

    @Delete(':id')
    async deleteTravelById(@Param('id') travelId: string,) {
        await this.travelsService.deleteTravelById(travelId);
        return null;
    }


    
}