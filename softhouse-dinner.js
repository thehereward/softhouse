People = new Meteor.Collection("people");

if (Meteor.isClient) {
  Template.dinner.people = function () {
    return People.find({}, {sort: {name: 1}});
  };

  Template.person.events({
    'click' : function () {
      if (typeof console !== 'undefined')
        People.update(
          {_id: this._id},
          {
            $set: {
              "havingDinner": !this.havingDinner,
              "lastUpdated": new Date()
            }
          });
    }
  });

  Template.person.havingDinner = function () {
    if (this.lastUpdated.getDate() == (new Date()).getDate()) {
      return this.havingDinner ? 'havingDinner' : 'notHavingDinner';
    } else {
      return 'notHavingDinner';
    }
  };

  Template.person.lastUpdated = function () {
    return this.lastUpdated.toLocaleString();
  }

  Template.dinner.today = function () {
    return (new Date()).toLocaleDateString();
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    People.remove({});
    if (People.find().count() === 0) {
	var names = ["Hereward",
                   "Simon",
                   "Tom"];
      for (var i = 0; i < names.length; i++) {
        People.insert({name: names[i], havingDinner: false, lastUpdated: new Date()});
      }
    }
  });
}
