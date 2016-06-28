import Ember from "ember";
import {ValidationMixin, validateEach} from "ember-cli-simple-validation/mixins/validate";

var ManyController = Ember.Controller.extend(ValidationMixin, {
    uniqueName: validateEach("name", function (name) {
        var filtered = this.get("model").filter(function (person) {
            return person.get("name") === name;
        });
        return filtered.length === 1;
    }),
    actions: {
        save: function() {
            this.set("submitted", true);
            if(this.get("valid")) {
                this.transitionToRoute("success");
            }
        }
    }
});

export default ManyController;
