import Ember from 'ember';
import Person from 'dummy/models/person';

export default Ember.Route.extend({
    model: function() {
        var store = this.get('store');
        store.push('person', {
            name: 'toran',
            zipcode: '52601',
            email: 'toranb@gmail.com'
        });
        return store.findOne('person');
    }
});
