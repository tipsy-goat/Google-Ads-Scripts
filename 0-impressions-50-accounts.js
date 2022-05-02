function main() {
  var accounts = [];

  //Calculate yesterday
  var MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  var now = new Date();
  var yesterday = new Date(now.getTime() - MILLIS_PER_DAY);

  //You can add multiple emails, seperated by commas
  var mail = 'YOUR EMAIL GOES HERE'

  var accountIterator = MccApp.accounts().withLimit(50).get();
  var mccAccount = AdWordsApp.currentAccount();

  while (accountIterator.hasNext()) {
    var account = accountIterator.next();

    MccApp.select(account);
    var impressions = account.getStatsFor('YESTERDAY').getImpressions();
    if(impressions == 0){
      accounts.push(account.getName());
      accounts.push('   (ID ',account.getCustomerId(), ') \n ');

    }
  }

  var acts = accounts.join(''); //joins the array and removes the comma (,) delimiter

  if(accounts.length > 0)
    MailApp.sendEmail( mail, 'Accounts with no impressions on ' + yesterday, 'Please check the following accounts, they are not recording Impressions. \n'
                      + acts);
}
