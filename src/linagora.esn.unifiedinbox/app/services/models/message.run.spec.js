'use strict';

/* global chai: false, sinon: false */

const { expect } = chai;

describe('The Message run block', function() {
  var jmapDraft, inboxMailboxesService;

  beforeEach(angular.mock.module('linagora.esn.unifiedinbox', function($provide) {
    $provide.value('inboxMailboxesService', inboxMailboxesService = {
      flagIsUnreadChanged: sinon.spy()
    });
  }));

  beforeEach(angular.mock.inject(function(_jmapDraft_, session) {
    jmapDraft = _jmapDraft_;

    session.user = {
      preferredEmail: 'user@linagora.com'
    };
  }));

  function newMessage(options) {
    return new jmapDraft.Message(null, 'id', 'blobId', 'threadId', ['inbox'], options);
  }

  it('should have a correct initial value for isUnread', function() {
    expect(newMessage().isUnread).to.equal(false);
  });

  it('should call inboxMailboxesService when isUnread is written, if value changes', function() {
    var email = newMessage({ isUnread: true });

    email.isUnread = false;

    expect(inboxMailboxesService.flagIsUnreadChanged).to.have.been.calledOnce;
    expect(inboxMailboxesService.flagIsUnreadChanged).to.have.been.calledWith(email, false);
  });

  it('should not call inboxMailboxesService when isUnread is written, if value does not change', function() {
    var email = newMessage();

    email.isUnread = false;

    expect(inboxMailboxesService.flagIsUnreadChanged).to.not.have.been.calledWith();
  });

  it('should return a Selectable', function() {
    expect(newMessage(true).selectable).to.equal(true);
  });

  describe('The hasReplyAll attribute', function() {

    it('should allow replying all if there are more than one recipient', function() {
      var email = newMessage({ to: [{ email: 'bob@email.com' }], cc: [{ email: 'alice@email.com' }] });

      expect(email.hasReplyAll).to.equal(true);
    });

    it('should allow replying all if the user is not the single recipient', function() {
      var email = newMessage({ to: [{ email: 'bob@email.com' }], cc: [] });

      expect(email.hasReplyAll).to.equal(true);
    });

    it('should not allow replying all if the user is the single recipient', function() {
      var email = newMessage({ to: [{ email: 'user@linagora.com' }], cc: [] });

      expect(email.hasReplyAll).to.equal(false);
    });

  });

});
