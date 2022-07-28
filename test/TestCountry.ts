import {expect} from "chai";
import { ethers } from "hardhat";


describe("Test Country CRUD Operations", function(){

    let crudContract : any;
    let CrudContract : any;
    let owner : any;

    
  it("Insert", async function(){

   try {
    
    [owner] = await ethers.getSigners();

    crudContract = await ethers.getContractFactory("CrudContract");

    CrudContract = await crudContract.deploy();

    await CrudContract.deployed();

    await CrudContract.connect(owner).insertCountryDetails(1,"India", "PM Manmohan Singh", 1200000000);
    await CrudContract.connect(owner).insertCountryDetails(2,"USA", "President Barak Obama", 120000000);

    console.log("Country Details:",(await CrudContract.connect(owner).callStatic.getCountryDetails(1)));
    expect((await CrudContract.getCountryDetails(1))._name).to.equal("India");

        } catch (error) {

            console.log((<Error>error).message);
        }
  
    })

    it("Update Leader", async function(){

        try {
     
         await CrudContract.connect(owner).updateCountryLeader(1,"PM Narendra Modi");
     
         console.log("Country Details:",(await CrudContract.connect(owner).callStatic.getCountryDetails(1)));
         expect((await CrudContract.getCountryDetails(1))._leader).to.equal("PM Rahul Gandhi");
     
             } catch (error) {
     
                 console.log((<Error>error).message);
             }
       
         })


    it("Update Population", async function(){

    try {
    
        await CrudContract.connect(owner).updateCountryPopulation(1,1500000000);
    
        console.log("Country Details:",(await CrudContract.connect(owner).callStatic.getCountryDetails(1)));
        expect((await CrudContract.getCountryDetails(1))._population).to.equal(1500000000);
    
            } catch (error) {
    
                console.log((<Error>error).message);
            }
    
        })

    it("Delete Country", async function(){

        try {
        
            console.log("Country Details:",(await CrudContract.connect(owner).callStatic.getCountryDetails(2)));
            
            await CrudContract.connect(owner).deleteCountry(2);
        
            console.log("Country Details:",(await CrudContract.connect(owner).callStatic.getCountryDetails(2)));
            expect((await CrudContract.getCountryDetails(2))._population).to.equal(0);
        
                } catch (error) {
        
                    console.log((<Error>error).message);
                }
        
            })
})