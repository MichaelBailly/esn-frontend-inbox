'use strict';

require('../../providers.js');
require('./search-submit.service.js');

angular.module('linagora.esn.unifiedinbox').factory('inboxSearchResultsProvider', inboxSearchResultsProvider);

function inboxSearchResultsProvider(inboxNewMessageProvider, computeUniqueSetOfRecipients, inboxSearchResultsProviderSubmit) {
  var provider = inboxNewMessageProvider('/unifiedinbox/app/search/provider/search-results-provider.html', computeUniqueSetOfRecipients);

  provider.onSubmit = inboxSearchResultsProviderSubmit;

  return provider;
}
