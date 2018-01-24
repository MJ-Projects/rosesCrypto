pragma solidity ^0.4.11;

import "./Owned.sol";


contract CryptoRose is Owned {


//RED ROSE

  // Custom types
  struct Rose {
    uint id;
    address lover;
    string name;
    string description;
    string from;
  }

  // State variables
  mapping(uint => Rose) public Roses;
  uint RoseCounter;


  // Events
  event dedicateRoseEvent (
    uint indexed _id,
    address indexed _lover,
    string _name
  );



  // dedicate a Rose
  function dedicateRose(string _name, string _description, string _from) payable public {
    // a new Rose
    RoseCounter++;
    require ( msg.value > 49000000000000000);

    // store this Rose
    Roses[RoseCounter] = Rose(
         RoseCounter,
         msg.sender,
         _name,
         _description,
         _from
    );

owner.transfer(msg.value);
    // trigger the event
    dedicateRoseEvent(RoseCounter, msg.sender, _name);
  }



  // fetch the number of Roses in the contract
  function getNumberOfRoses() public constant returns (uint) {
    return RoseCounter;
  }


  // fetch and returns all Rose IDs that have been dedicated
  function getRosesDedicated() public constant returns (uint[]) {
    // we check whether there is at least one Rose
    if(RoseCounter == 0) {
      return new uint[](0);
    }

    // prepare intermediary array
    uint[] memory RoseIds = new uint[](RoseCounter);

    uint numberOfRosesDedicated = 0;
    // iterate over Roses
    for (uint i = 1; i <= RoseCounter; i++) {
      // keep only the ID of Roses not sold yet
        RoseIds[numberOfRosesDedicated] = Roses[i].id;
        numberOfRosesDedicated++;

    }

    // copy the RoseIds array into the smaller Dedicated array
    uint[] memory Dedicated = new uint[](numberOfRosesDedicated);
    for (uint j = 0; j < numberOfRosesDedicated; j++) {
      Dedicated[j] = RoseIds[j];
    }
    return (Dedicated);
  }

  //Gold ROSE

    // Custom types
    struct RoseGold {
      uint idGold;
      address loverGold;
      string nameGold;
      string descriptionGold;
      string fromGold;
    }

    // State variables
    mapping(uint => RoseGold) public RosesGold;
    uint RoseGoldCounter;


    // Events
    event dedicateRoseGoldEvent (
      uint indexed _idGold,
      address indexed _loverGold,
      string _nameGold
    );



    // dedicate a Rose
    function dedicateRoseGold(string _nameGold, string _descriptionGold, string _fromGold) payable public {
      // a new Rose
      RoseGoldCounter++;
      require ( msg.value > 900000000000000000);
      require ( RoseGoldCounter < 101);

      // store this Rose
      RosesGold[RoseGoldCounter] = RoseGold(
           RoseGoldCounter,
           msg.sender,
           _nameGold,
           _descriptionGold,
           _fromGold
      );

owner.transfer(msg.value);
      // trigger the event
      dedicateRoseGoldEvent(RoseGoldCounter, msg.sender, _nameGold);
    }



    // fetch the number of Roses in the contract
    function getNumberOfRosesGold() public constant returns (uint) {
      return RoseGoldCounter;
    }


    // fetch and returns all Rose IDs that have been dedicated
    function getRosesGoldDedicated() public constant returns (uint[]) {
      // we check whether there is at least one Rose
      if(RoseGoldCounter == 0) {
        return new uint[](0);
      }

      // prepare intermediary array
      uint[] memory RoseGoldIds = new uint[](RoseGoldCounter);

      uint numberOfRosesGoldDedicated = 0;
      // iterate over Roses
      for (uint i = 1; i <= RoseGoldCounter; i++) {
        // keep only the ID of Roses not sold yet
          RoseGoldIds[numberOfRosesGoldDedicated] = RosesGold[i].idGold;
          numberOfRosesGoldDedicated++;

      }

      // copy the RoseIds array into the smaller Dedicated array
      uint[] memory DedicatedGold = new uint[](numberOfRosesGoldDedicated);
      for (uint j = 0; j < numberOfRosesGoldDedicated; j++) {
        DedicatedGold[j] = RoseGoldIds[j];
      }
      return (DedicatedGold);
    }


    //Purple ROSE

  // Custom types
  struct RosePurple {
    uint idPurple;
    address loverPurple;
    string namePurple;
    string descriptionPurple;
    string fromPurple;
  }

  // State variables
  mapping(uint => RosePurple) public RosesPurple;
  uint RosePurpleCounter;


  // Events
  event dedicateRosePurpleEvent (
    uint indexed _idPurple,
    address indexed _loverPurple,
    string _namePurple
  );



  // dedicate a Rose
  function dedicateRosePurple(string _namePurple, string _descriptionPurple, string _fromPurple) payable public {
    // a new Rose
    RosePurpleCounter++;
    require ( RosePurpleCounter < 2);
    require ( msg.value > 99000000000000000000);




    // store this Rose
    RosesPurple[RosePurpleCounter] = RosePurple(
         RosePurpleCounter,
         msg.sender,
         _namePurple,
         _descriptionPurple,
         _fromPurple
    );

    // trigger the event
    owner.transfer(msg.value);
    dedicateRosePurpleEvent(RosePurpleCounter, msg.sender, _namePurple);
  }



  // fetch the number of Roses in the contract
  function getNumberOfRosesPurple() public constant returns (uint) {
    return RosePurpleCounter;
  }


  // fetch and returns all Rose IDs that have been dedicated
  function getRosesPurpleDedicated() public constant returns (uint[]) {
    // we check whether there is at least one Rose
    if(RosePurpleCounter == 0) {
      return new uint[](0);
    }

    // prepare intermediary array
    uint[] memory RosePurpleIds = new uint[](RosePurpleCounter);

    uint numberOfRosesPurpleDedicated = 0;
    // iterate over Roses
    for (uint i = 1; i <= RosePurpleCounter; i++) {
      // keep only the ID of Roses not sold yet
        RosePurpleIds[numberOfRosesPurpleDedicated] = RosesPurple[i].idPurple;
        numberOfRosesPurpleDedicated++;

    }

    // copy the RoseIds array into the smaller Dedicated array
    uint[] memory DedicatedPurple = new uint[](numberOfRosesPurpleDedicated);
    for (uint j = 0; j < numberOfRosesPurpleDedicated; j++) {
      DedicatedPurple[j] = RosePurpleIds[j];
    }
    return (DedicatedPurple);
  }




  // kill the smart contract
  function kill() onlyOwner {
    selfdestruct(owner);
  }

//Random





}
