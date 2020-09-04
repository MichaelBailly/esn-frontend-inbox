'use strict';

require('../attachment-provider-registry/attachment-provider-registry.service.js');
require('./attachment-jmap.service.js');

angular.module('linagora.esn.unifiedinbox')
  .run(run);

function run(
  inboxAttachmentProviderRegistry,
  inboxAttachmentJmap
) {
  inboxAttachmentProviderRegistry.add(inboxAttachmentJmap);
}
