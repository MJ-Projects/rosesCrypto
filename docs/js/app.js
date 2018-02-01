App = {
  web3Provider: null,
  contracts: {},
  account: 0x0,
  loading: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
      web3 = new Web3(App.web3Provider);
    }
    App.displayAccountInfo();
    return App.initContract();
  },

  displayAccountInfo: function() {
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#account").text(account);
        web3.eth.getBalance(account, function(err, balance) {
          if (err === null) {
            $("#accountBalance").text(web3.fromWei(balance, "ether") + " ETH");
          }
        });
      }
    });
  },

  initContract: function() {
    $.getJSON('CryptoRose.json', function(CryptoRoseArtifact) {
      // Get the necessary contract artifact file and use it to instantiate a truffle contract abstraction.
      App.contracts.CryptoRose = TruffleContract(CryptoRoseArtifact);

      // Set the provider for our contract.
      App.contracts.CryptoRose.setProvider(App.web3Provider);

      // Listen for events
      App.listenToEvents();

      // Retrieve the Rose from the smart contract
      return App.reloadRoses();
      //return App.reloadRosesGold();
      //return App.reloadRosesPurple();
    });
  },

//RED ROSES
  reloadRoses: function() {
    // avoid reentry
    if (App.loading) {
      return;
    }
    App.loading = true;

    // refresh account information because the balance may have changed
    App.displayAccountInfo();

    var CryptoRoseInstance;


    App.contracts.CryptoRose.deployed().then(function(instance) {
      CryptoRoseInstance = instance;
      return CryptoRoseInstance.getRosesDedicated();
    }).then(function(RoseIds) {
      // Retrieve and clear the Rose placeholder
      var RosesRow = $('#RosesRow');
      RosesRow.empty();

      for (var i = 0; i < RoseIds.length; i++) {
        var RoseId = RoseIds[i];
        CryptoRoseInstance.Roses(RoseId.toNumber()).then(function(Rose) {
          App.displayRose(
            Rose[0],
            Rose[1],
            Rose[2],
            Rose[3],
            Rose[4]
          );
        });
      }
      App.loading = false;
    }).catch(function(err) {
      console.log(err.message);
      App.loading = false;
    });

    var CryptoRoseGoldInstance;

    App.contracts.CryptoRose.deployed().then(function(instance) {
      CryptoRoseGoldInstance = instance;
      return CryptoRoseGoldInstance.getRosesGoldDedicated();
    }).then(function(RoseGoldIds) {
      // Retrieve and clear the Rose placeholder
      var RosesGoldRow = $('#RosesGoldRow');
      RosesGoldRow.empty();

      for (var i = 0; i < RoseGoldIds.length; i++) {
        var RoseGoldId = RoseGoldIds[i];
        CryptoRoseGoldInstance.RosesGold(RoseGoldId.toNumber()).then(function(RoseGold) {
          App.displayRoseGold(
            RoseGold[0],
            RoseGold[1],
            RoseGold[2],
            RoseGold[3],
            RoseGold[4]
          );
        });
      }
      App.loading = false;
    }).catch(function(err) {
      console.log(err.message);
      App.loading = false;
    });

    var CryptoRosePurpleInstance;

    App.contracts.CryptoRose.deployed().then(function(instance) {
      CryptoRosePurpleInstance = instance;
      return CryptoRosePurpleInstance.getRosesPurpleDedicated();
    }).then(function(RosePurpleIds) {
      // Retrieve and clear the Rose placeholder
      var RosesPurpleRow = $('#RosesPurpleRow');
      RosesPurpleRow.empty();

      for (var i = 0; i < RosePurpleIds.length; i++) {
        var RosePurpleId = RosePurpleIds[i];
        CryptoRosePurpleInstance.RosesPurple(RosePurpleId.toNumber()).then(function(RosePurple) {
          App.displayRosePurple(
            RosePurple[0],
            RosePurple[1],
            RosePurple[2],
            RosePurple[3],
            RosePurple[4]
          );
        });
      }
      App.loading = false;
    }).catch(function(err) {
      console.log(err.message);
      App.loading = false;
    });





  },

  displayRose: function(id, lover, name, description, from) {
    // Retrieve the Rose placeholder
    var RosesRow = $('#RosesRow');

    //var etherPrice = web3.fromWei(1, "ether");

    // Retrieve and fill the Rose template
    var RoseTemplate = $('#RoseTemplate');
    RoseTemplate.find('.panel-title').text(name);
    RoseTemplate.find('.Rose-description').text(description);
    RoseTemplate.find('.Rose-from').text(from);
    RoseTemplate.find('.Rose-lover').text(lover);
    //RoseTemplate.find('.Rose-price').text(etherPrice + " ETH");
    //RoseTemplate.find('.btn-buy').attr('data-id', id);
    //RoseTemplate.find('.btn-buy').attr('data-value', etherPrice);

    // lover?

    // add this new Rose
    RosesRow.append(RoseTemplate.html());
  },

  dedicateRose: function() {
    // retrieve details of the Rose
    var _Rose_name = $("#rose_name").val();
    var _description = $("#rose_description").val();
    var _from = $("#rose_from").val();
    //var _price = web3.toWei(parseFloat($("#Rose_price").val() || 0), "ether");
    /*
    if ((_Rose_name.trim() == '') || (_price == 0)) {
      // nothing to dedicate
      return false;
    }
    */

    App.contracts.CryptoRose.deployed().then(function(instance) {
      return instance.dedicateRose(_Rose_name, _description, _from, {
        value: web3.toWei(0.05, "ether"),
        from: App.account,
        gas: 23000
      });
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
  },

  // Listen for events raised from the contract
  listenToEvents: function() {
    App.contracts.CryptoRose.deployed().then(function(instance) {
      instance.dedicateRoseEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        if (!error) {
          $("#events").append('<li class="list-group-item">' + event.args._name + ' has a Valentine' + '</li>');
        } else {
          console.error(error);
        }
        App.reloadRoses();
      });

    });
  },

//RED ROSE

//GOLD ROSES
/*
  reloadRosesGold: function() {
    // avoid reentry
    if (App.loading) {
      return;
    }
    App.loading = true;

    // refresh account information because the balance may have changed
    App.displayAccountInfo();

    var CryptoRoseGoldInstance;

    App.contracts.CryptoRose.deployed().then(function(instance) {
      CryptoRoseGoldInstance = instance;
      return CryptoRoseGoldInstance.getRosesGoldDedicated();
    }).then(function(RoseGoldIds) {
      // Retrieve and clear the Rose placeholder
      var RosesGoldRow = $('#RosesGoldRow');
      RosesGoldRow.empty();

      for (var i = 0; i < RoseGoldIds.length; i++) {
        var RoseGoldId = RoseGoldIds[i];
        CryptoRoseGoldInstance.RosesGold(RoseGoldId.toNumber()).then(function(RoseGold) {
          App.displayRoseGold(
            RoseGold[0],
            RoseGold[1],
            RoseGold[2],
            RoseGold[3],
            RoseGold[4]
          );
        });
      }
      App.loading = false;
    }).catch(function(err) {
      console.log(err.message);
      App.loading = false;
    });
  },
  */

  displayRoseGold: function(idGold, loverGold, nameGold, descriptionGold, fromGold) {
    // Retrieve the Rose placeholder
    var RosesGoldRow = $('#RosesGoldRow');

    //var etherPrice = web3.fromWei(1, "ether");

    // Retrieve and fill the Rose template
    var RoseGoldTemplate = $('#RoseGoldTemplate');
    RoseGoldTemplate.find('.panel-title').text(nameGold);
    RoseGoldTemplate.find('.RoseGold-description').text(descriptionGold);
    RoseGoldTemplate.find('.RoseGold-from').text(fromGold);
    RoseGoldTemplate.find('.RoseGold-lover').text(loverGold);
    //RoseTemplate.find('.Rose-price').text(etherPrice + " ETH");
    //RoseTemplate.find('.btn-buy').attr('data-id', id);
    //RoseTemplate.find('.btn-buy').attr('data-value', etherPrice);

    // lover?

    // add this new Rose
    RosesGoldRow.append(RoseGoldTemplate.html());
  },

  dedicateRoseGold: function() {
    // retrieve details of the Rose
    var _RoseGold_name = $("#roseGold_name").val();
    var _descriptionGold = $("#roseGold_description").val();
    var _fromGold = $("#roseGold_from").val();
    //var _price = web3.toWei(parseFloat($("#Rose_price").val() || 0), "ether");
    /*
    if ((_Rose_name.trim() == '') || (_price == 0)) {
      // nothing to dedicate
      return false;
    }
    */

    App.contracts.CryptoRose.deployed().then(function(instance) {
      return instance.dedicateRoseGold(_RoseGold_name, _descriptionGold, _fromGold, {
        value: web3.toWei(1, "ether"),
        from: App.account,
        gas: 23000
      });
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
  },
//PAST PURPLE ROSE HERE

displayRosePurple: function(idPurple, loverPurple, namePurple, descriptionPurple, fromPurple) {
    // Retrieve the Rose placeholder
    var RosesPurpleRow = $('#RosesPurpleRow');

    //var etherPrice = web3.fromWei(1, "ether");

    // Retrieve and fill the Rose template
    var RosePurpleTemplate = $('#RosePurpleTemplate');
    RosePurpleTemplate.find('.panel-title').text(namePurple);
    RosePurpleTemplate.find('.RosePurple-description').text(descriptionPurple);
    RosePurpleTemplate.find('.RosePurple-from').text(fromPurple);
    RosePurpleTemplate.find('.RosePurple-lover').text(loverPurple);
    //RoseTemplate.find('.Rose-price').text(etherPrice + " ETH");
    //RoseTemplate.find('.btn-buy').attr('data-id', id);
    //RoseTemplate.find('.btn-buy').attr('data-value', etherPrice);

    // lover?

    // add this new Rose
    RosesPurpleRow.append(RosePurpleTemplate.html());
  },

  dedicateRosePurple: function() {
    // retrieve details of the Rose
    var _RosePurple_name = $("#rosePurple_name").val();
    var _descriptionPurple = $("#rosePurple_description").val();
    var _fromPurple = $("#rosePurple_from").val();
    //var _price = web3.toWei(parseFloat($("#Rose_price").val() || 0), "ether");
    /*
    if ((_Rose_name.trim() == '') || (_price == 0)) {
      // nothing to dedicate
      return false;
    }
    */

    App.contracts.CryptoRose.deployed().then(function(instance) {
      return instance.dedicateRosePurple(_RosePurple_name, _descriptionPurple, _fromPurple, {
        value: web3.toWei(1, "ether"),
        from: App.account,
        gas: 23000
      });
    }).then(function(result) {

    }).catch(function(err) {
      console.error(err);
    });
  },




};
  // Listen for events raised from the contract



$(function() {
  $(window).load(function() {
    App.init();
  });
});
