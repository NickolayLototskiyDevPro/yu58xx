const ProjectSingleton = (function() {
  function ProjectSingleton() {
    this.participants = [];
    this.pricing = {};
    this.isBusy = false;

    /* implement initialization of the object */
    /* participants - predefined array of participants */
    /* pricing - predefined object (keyvalue collection) of pricing */
    this.init = function(participants, pricing) {
      if (typeof participants !== 'undefined' && Array.isArray(participants)) {
        this.participants = participants;
      }

      if (
        typeof pricing !== 'undefined' &&
        typeof pricing === 'object' &&
        !Array.isArray(pricing) &&
        pricing !== null
      ) {
        this.pricing = pricing;
      }
    };

    /* pass found participant into callback, stops on first match */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with found participant as argument or with null if not */
    /* callbackFunction (participant) => {} */
    this.findParticipant = function(functor, callbackFunction) {
    // проверка что можно запускаться
    // if (this.isBusy === true) return false;
    // Запуск
    this.isBusy = true;
    setTimeout(() =>
    {  
                                 // functor(this.participants)
     const  functorResult  =  this.participants.find(functor);
        (functorResult === undefined) ? callbackFunction(null) : callbackFunction(functorResult);
        this.isBusy = false;
    }, 1000);
    },

    /* pass array of found participants into callback */
    /* functor - function that will be executed for elements of participants array */
    /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
    /* callbackFunction (participantsArray) => {} */
    this.findParticipants = function(functor, callbackFunction) {

    this.isBusy = true;
    setTimeout(() =>
    {  
    const functorResult = this.participants.filter(functor);
        callbackFunction(functorResult);
        this.isBusy = false;
    }, 1000);
    },

    /* push new participant into this.participants array */
    /* callbackFunction - function that will be executed when job will be done */
    /* (err) => {} */
    this.addParticipant = function(participantObject, callbackFunction) {
    // проверка что можно запускаться
    // if (this.isBusy === true) return false;
    // Запуск
            this.isBusy = true;
            setTimeout(() => {
                if (typeof participantObject === 'object' && 'seniorityLevel' in participantObject) {
                    this.participants.push(participantObject);
                    callbackFunction();
                } else {
                    callbackFunction('Error');
                }
                this.isBusy = false;
            },1000);

    },

    /* push new participant into this.participants array */
    /* callback should receive removed participant */
    /* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
    this.removeParticipant = function(participantObject, callbackFunction) {
    // проверка что можно запускаться
    // if (this.isBusy === true) return false;
    // Запуск
    this.isBusy = true
     setTimeout(() => {
        let removedIndex = this.participants.indexOf(participantObject);
        (removedIndex === -1) ? callbackFunction(null) : callbackFunction(this.participants.splice(removedIndex)[0]);
                this.isBusy = false;
            },1000);


    },

    /* Extends this.pricing with new field or change existing */
    /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
    this.setPricing = function(participantPriceObject, callbackFunction) {
            this.isBusy = true;
            setTimeout(() => {
                Object.assign(this.pricing, participantPriceObject);
                callbackFunction();
                this.isBusy = false;
            });
        },

    /* calculates salary of all participants in the given period */
    /* periodInDays, has type number, one day is equal 8 working hours */
    this.calculateSalary = function(periodInDays) {
           let salary = this.participants.reduce((sum, i) => {
               return sum + this.pricing[i.seniorityLevel] * periodInDays * 8;
           }, 0);
           if (!isNaN(salary)) {
               return salary;
           } else {
                throw new Error('Error');
            }
        }
    };

  let projectInstance;

  let project = {
    getInstance: function() {
      if (projectInstance === undefined) {
        projectInstance = new ProjectSingleton();
      }

      return projectInstance;
    },
  };

  return project;
})();

const projectSingleton = ProjectSingleton.getInstance();

module.exports = {
  firstName: 'Seleznyov',
  lastName: 'Artyom',
  task: projectSingleton,
};