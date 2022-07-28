// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;


contract CrudContract{

    struct Country{
        string name;
        string leader;
        uint population;
    }

    //country[] public countries;

    mapping (uint => Country) public countryDetails;
    
    event countryAdded(uint countryId, string name, string leader, uint population);
    event countryLeaderUpdated(uint countryId, string leader);
    event countryPopulationUpdated(uint countryId, uint population);
    event countryDeleted(uint countryId);

    uint countriesCount;
    address owner;

    constructor(){

        countriesCount=0;
        owner=msg.sender;

    } 

    modifier onlyOwner{

        require(msg.sender==owner, "Not an owner!");
        _;

    }

    function insertCountryDetails(uint _countryId, string memory _name, string memory _leader, uint _population) public onlyOwner returns(uint){
        
        countryDetails[_countryId] = Country(_name,  _leader, _population);
        countriesCount++;
        emit countryAdded(_countryId, _name, _leader, _population);
        return countriesCount;
        
    }

    function getCountryDetails(uint _countryId) public view returns(string memory _name, string memory _leader, uint _population){

            Country memory country = countryDetails[_countryId];
            return(country.name, country.leader, country.population);
    }

    function updateCountryLeader(uint _countryId, string memory _leader) public onlyOwner returns (bool){

       countryDetails[_countryId].leader = _leader;
       emit countryLeaderUpdated(_countryId, _leader);
       return true;

    }

    function updateCountryPopulation(uint _countryId, uint _population) public onlyOwner returns (bool){

        countryDetails[_countryId].population = _population;
        emit countryPopulationUpdated(_countryId, _population);
        return true;

    }

    function deleteCountry(uint _countryId) public onlyOwner returns (bool){

        delete countryDetails[_countryId];
        emit countryDeleted(_countryId);
        return true;
    }
}