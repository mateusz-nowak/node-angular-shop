module.exports = {
    administratorEmailAddress: ['mateusz.nowak@xsolve.pl', 'paykitson@gmail.com'],

    isAdmin: function(profile) {
        var self = this,
            isAdmin = false;

        if (!profile) {
            return false;
        }
        
        profile.emails.forEach(function(email) {
            if (self.administratorEmailAddress.indexOf(email.value) != -1) {
                isAdmin = true;
            }
        });

        return isAdmin;
    }
};
