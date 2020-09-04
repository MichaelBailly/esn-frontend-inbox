'use strict';

/* global chai, _: false */

const { expect } = chai;

describe('The inboxFilterDescendantMailboxes filter', function() {

  var filter, cache;

  beforeEach(function() {
    angular.mock.module('esn.inbox.libs');
  });

  beforeEach(angular.mock.inject(function(inboxFilterDescendantMailboxesFilter, inboxMailboxesCache, jmapDraft) {
    filter = inboxFilterDescendantMailboxesFilter;
    cache = inboxMailboxesCache;

    [
      new jmapDraft.Mailbox(null, '1', '1'),
      new jmapDraft.Mailbox(null, '2', '2', { parentId: '1' }),
      new jmapDraft.Mailbox(null, '3', '3', { parentId: '2' }),
      new jmapDraft.Mailbox(null, '4', '4'),
      new jmapDraft.Mailbox(null, '5', '5', { parentId: '4' })
    ].forEach(function(mailbox) {
      cache.push(mailbox);
    });
  }));

  it('should return mailboxes as-is when not defined', function() {
    expect(filter()).to.equal(undefined);
  });

  it('should return mailboxes as-is when null given', function() {
    expect(filter(null)).to.equal(null);
  });

  it('should return mailboxes as-is when no id is given', function() {
    expect(filter([])).to.deep.equal([]);
  });

  it('should return mailboxes as-is when the mailbox is not found', function() {
    expect(filter(cache, '0')).to.deep.equal(cache);
  });

  it('should filter out the mailbox and its descendants', function() {
    expect(_.map(filter(cache, '1'), 'id')).to.deep.equal(['4', '5']);
  });

  it('should filter out the mailbox only when there is no descendants', function() {
    expect(_.map(filter(cache, '5'), 'id')).to.deep.equal(['1', '2', '3', '4']);
  });

  it('should filter out the mailbox only when there is descendants but filterOnlyParentMailbox=true', function() {
    expect(_.map(filter(cache, '1', true), 'id')).to.deep.equal(['2', '3', '4', '5']);
  });

});
