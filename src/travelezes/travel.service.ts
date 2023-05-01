import { Injectable, NotFoundException } from '@nestjs/common';
import { ignoreElements } from 'rxjs';
import { Travel } from './travel.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { title } from 'process';

@Injectable()
export class TravelService {

    constructor(@InjectModel('Travel') private readonly travelModel: Model<Travel>) { }


    async getAllBudgetTravels(){
        const travels = await this.travelModel.find().exec();

        const bud = travels.map(t => ({ id: t.id, 
            dest: t.dest,
            price: t.price,
            rating: t.rating,
            amen: t.amen, 
            dist: t.dist 
        }));

        const allBudTravel = [];
        

        for (let i = 0; i < 5; i++) {
            console.log(`The value of i is: ${i}`);
            if (bud[i].price === "budget") {
                console.log(bud[i]); 
                allBudTravel.push(bud[i]);
                
            }
            



        
        }


        return allBudTravel.map(t => ({ id: t.id, 
            dest: t.dest,
            price: t.price,
            rating: t.rating,
            amen: t.amen, 
            dist: t.dist 
        }));
    }

    async getAllStandardTravels(){
        const travels = await this.travelModel.find().exec();

        const stand = travels.map(t => ({ id: t.id, 
            dest: t.dest,
            price: t.price,
            rating: t.rating,
            amen: t.amen, 
            dist: t.dist 
        }));

        const allStandTravel = [];
        

        for (let i = 0; i < 5; i++) {
            console.log(`The value of i is: ${i}`);
            if (stand[i].price === "standard") {
                console.log(stand[i]); 
                allStandTravel.push(stand[i]);
                
            }
            



        
        }


        return allStandTravel.map(t => ({ id: t.id, 
            dest: t.dest,
            price: t.price,
            rating: t.rating,
            amen: t.amen, 
            dist: t.dist 
        }));
    }

    async getAllLuxuryTravels(){
        const travels = await this.travelModel.find().exec();

        const lux = travels.map(t => ({ id: t.id, 
            dest: t.dest,
            price: t.price,
            rating: t.rating,
            amen: t.amen, 
            dist: t.dist 
        }));

        const allLuxTravel = [];
        

        for (let i = 0; i < 5; i++) {
            console.log(`The value of i is: ${i}`);
            if (lux[i].price === "luxury") {
                console.log(lux[i]); 
                allLuxTravel.push(lux[i]);
                
            }
            



        
        }


        return allLuxTravel.map(t => ({ id: t.id, 
            dest: t.dest,
            price: t.price,
            rating: t.rating,
            amen: t.amen, 
            dist: t.dist 
        }));
    }




    
    async getAllTravels() {
        const travels = await this.travelModel.find().exec();
        return travels.map(t => ({ id: t.id, 
            dest: t.dest,
            price: t.price,
            rating: t.rating,
            amen: t.amen, 
            dist: t.dist 
        }));
    }

    async insertTravel(dest: string, price: string, rating: string, amen: Array<string>, dist:string) {
        const newTravel = new this.travelModel({ dest: dest, price:price, rating:rating, amen:amen, dist:dist });
        const result = await newTravel.save();
       // console.log(result);
        return result.id as string;
    }

    async getTravelById(travelId: string) {
        const travel = await (await this.findTravel(travelId));
        return { dest: travel.dest, price: travel.price, rating: travel.rating, amen: travel.amen, dist: travel.dist };
    }

    async updateTravelById(travelId: string, dest: string, price: string, rating: string, amen: Array<string>, dist:string) {
        const updatedTravel = await this.findTravel(travelId);

        if (dest) {
            updatedTravel.dest = dest;
        }
        if (price) {
            updatedTravel.price = price;
        }
        if (rating) {
            updatedTravel.rating = rating;
        }
        if (amen) {
            amen.forEach(e => {
                if (e && updatedTravel.amen.indexOf(e) == -1) {
                    updatedTravel.amen.push(e);
                }
            });
        }
        if (dist) {
            updatedTravel.dist = dist;
        }
        updatedTravel.save();
    }

    async deleteTravelById(travelId: string) {
        const result = await this.travelModel.deleteOne({ _id: travelId }).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('product does not exist');
        }

    }

    private async findTravel(travelId: string): Promise<Travel> {
        let travel;
        try {
            travel = await this.travelModel.findById(travelId)

        } catch (error) {
            throw new NotFoundException('product does not exist');

        }
        if (!travel) {
            throw new NotFoundException('product does not exist');
        }
        return travel;
    }
}