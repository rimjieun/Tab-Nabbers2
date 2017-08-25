/**
 * Created by esterlingaccime on 8/14/17.
 */


const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const emailValid = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email.'];
const phonenumberValid = [/(?=^\d{10}$)|(?=^\d{3}-\d{3}-\d{4}$)|(?=^\(\d{3}\)\d{3}-\d{4}$)/, 'Please enter a valid phone number in the format 1234567890, 123-456-7890, or (123)456-7890'];
const zipcodeValid = [/^\d{5}(?:[-\s]\d{4})?$/, 'The zipcode must either be in the format XXXXX or XXXXX-XXXX.'];

const addressSchema = new mongoose.Schema({
  street_address: {
    type: String,
    required: true,
    trim: true
  },
  apartment_number: mongoose.Schema.Types.Mixed,
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2
  },
  zipcode: {
    type: String,
    required: true,
    match: zipcodeValid
  },
  _id: false
});


const userSchema = new mongoose.Schema({

  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    default: "Enter your first name"
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    default: "Enter your first name"
  },

  gender: {
    type: String,
    default: "Enter your gender",
    match: [/M|F/]
  },

  phoneNumber: {
    type: String,
    required: true,
    match: phonenumberValid,
    trim: true,
    default: "Enter your phone number"
  },

  address: {
    type:addressSchema,
    required: true
  },

  birthday: {
    
    month: {
      type: String
    },

    day: {
      type: String
    },

    year: {
      type: String
    }

  },

  photo: {
    type: String
  },

  photoUrl: {
    type: String
  },

  profiles: {
    
    github: {
      type: String,
      default: "Enter a link to your github profile"
    },

    linkedIn: {
      type: String,
      default: "Enter a link to your linkedIn profile"
    },

    website: {
      type: String,
      default: "Enter a link to your website"
    }
  },


  // Any more skills to add to the list?
  skills: {
    languages: {

    
      HTML: {
        type: Boolean
      },
      
      CSS: {
        type: Boolean
      },

      Javascript: {
        type: Boolean
      },

      Java: {
        type: Boolean
      },

      CPlusPlus: {
        type: Boolean
      },

      Python: {
        type: Boolean
      },

      PHP: {
        type: Boolean
      },

      Perl: {
        type: Boolean
      },

      Ruby: {
        type: Boolean
      },

      Rust: {
        type: Boolean
      }

    },

    frameworksAndLibraries: {
      Node: {
        type: Boolean
      },

      Express: {
        type: Boolean
      },

      React: {
        type: Boolean
      },

      Angular: {
        type: Boolean
      },

      Backbone: {
        type: Boolean
      },

      Ember: {
        type: Boolean
      },

      JQuery: {
        type: Boolean
      },

      Polymer: {
        type: Boolean
      },

      Knockout: {
        type: Boolean
      },

      VueJS: {
        type: Boolean
      },

      Bootstrap: {
        type: Boolean
      },

      Flask: {
        type: Boolean
      },

      ASPdotNET: {
        type: Boolean
      },

      SASS: {
        type: Boolean
      },

      LESS: {
        type: Boolean
      },


    },

    databases: {
      SQL: {
        type: Boolean
      },

      MongoDB: {
        type: Boolean
      }
    }
  },
  
  jobStatus: {
    type: String,
    default: "Enter your job status"
  },

  jobTitle: {
    type: String,
    default: "Enter your job title"
  },

  loginData: {
    local: {
      email: {
        type: String,
        unique: true,
        match: emailValid,
        minlength: 1
      },
      password: String
    },
    facebook: {
      id: {type: String},
      token: {type: String},
      email: {type: String},
      name: {type:String}
    },
    twitter: {
      id: {type:String},
      token: {type:String},
      displayName: {type:String},
      username: {type:String}
    },
    google: {
      id: {type:String},
      token: {type:String},
      email: {type:String},
      name: {type:String}
    },

    linkedin: {
      id: {type:String},
      token: {type: String},
      email: {type: String},
      name: {type:String}
    }
  }

});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


const User = mongoose.model('User', userSchema);

module.exports = User;