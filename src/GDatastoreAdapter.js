function returnsTrue() {
  return true;
}

// * a constructor with signature (connectionString, optionsObject)
// * connect()
// * loadSchema()
// * create(className, object)
// * find(className, query, options)
// * update(className, query, update, options)
// * destroy(className, query, options)

// A database adapter that works with data exported from the hosted
// Parse database.

var gcloud = require('gcloud');

var Parse = require('parse/node')
  .Parse;

var Schema = require('./Schema');

var transform = require('./transform');

// options can contain:
//   namespace: the string to put in front of every collection name.
function ExportAdapter(projectId, options = {}) {

  this.projectId = projectId;
  this.namespace = options.namespace;

  // We don't want a mutable this.schema, because then you could have
  // one request that uses different schemas for different parts of
  // it. Instead, use loadSchema to get a schema.
  this.schemaPromise = null;

  this.connect();
}

// Connects to the database.
// Returns a promise that resolves when the
// connection is successful.
// this.ds will be populated with a Google Cloud Datastore "DataSet" object when the
// promise resolves successfully.
ExportAdapter.prototype.connect = function () {

  this.ds = gcloud.datastore.dataset({
    projectId: projectId,
    namespace : this.namespace,
    keyFilename: '../key.json'
  });

};


// Returns a promise for a schema object.
// If we are provided a acceptor, then we run it on the schema.
// If the schema isn't accepted, we reload it at most once.
ExportAdapter.prototype.loadSchema = function (acceptor = returnsTrue) {
  // XXX : IS THERE A SCHEMA in GDS?
};

// Runs an update on the database.
// Returns a promise for an object with the new values for field
// modifications that don't know their results ahead of time, like
// 'increment'.
// Options:
//   acl:  a list of strings. If the object to be updated has an ACL,
//         one of the provided strings must provide the caller with
//         write permissions.
ExportAdapter.prototype.update = function (className, query, update, options) {

};


// Returns a promise for a Datastore.
// Generally just for internal use.
ExportAdapter.prototype.collection = function (className) {

};

ExportAdapter.prototype.rawCollection = function (className) {

};

// Returns a promise for the classname that is related to the given
// classname through the key.
// TODO: make this not in the ExportAdapter interface
ExportAdapter.prototype.redirectClassNameForKey = function (className, key) {

};

// Uses the schema to validate the object (REST API format).
// Returns a promise that resolves to the new schema.
// This does not update this.schema, because in a situation like a
// batch request, that could confuse other users of the schema.
ExportAdapter.prototype.validateObject = function (className, object, query) {

};

// Like transform.untransformObject but you need to provide a className.
// Filters out any data that shouldn't be on this REST-formatted object.
ExportAdapter.prototype.untransformObject = function (
  schema, isMaster, aclGroup, className, mongoObject) {

};


// Processes relation-updating operations from a REST-format update.
// Returns a promise that resolves successfully when these are
// processed.
// This mutates update.
ExportAdapter.prototype.handleRelationUpdates = function (className,
  objectId,
  update) {

};

// Adds a relation.
// Returns a promise that resolves successfully iff the add was successful.
ExportAdapter.prototype.addRelation = function (key, fromClassName,
  fromId, toId) {

};

// Removes a relation.
// Returns a promise that resolves successfully iff the remove was
// successful.
ExportAdapter.prototype.removeRelation = function (key, fromClassName, fromId, toId) {

};

// Removes objects matches this query from the database.
// Returns a promise that resolves successfully iff the object was
// deleted.
// Options:
//   acl:  a list of strings. If the object to be updated has an ACL,
//         one of the provided strings must provide the caller with
//         write permissions.
ExportAdapter.prototype.destroy = function (className, query, options = {}) {

};

// Inserts an object into the database.
// Returns a promise that resolves successfully iff the object saved.
ExportAdapter.prototype.create = function (className, object, options) {

};

// Runs a mongo query on the database.
// This should only be used for testing - use 'find' for normal code
// to avoid Mongo-format dependencies.
// Returns a promise that resolves to a list of items.
ExportAdapter.prototype.mongoFind = function (className, query, options = {}) {

};

// Deletes everything in the database matching the current namespace
// Won't delete collections in the system namespace
// Returns a promise.
ExportAdapter.prototype.deleteEverything = function () {

};

// Finds the keys in a query. Returns a Set. REST format only
function keysForQuery(query) {

}

// Returns a promise for a list of related ids given an owning id.
// className here is the owning className.
ExportAdapter.prototype.relatedIds = function (className, key, owningId) {

};

// Returns a promise for a list of owning ids given some related ids.
// className here is the owning className.
ExportAdapter.prototype.owningIds = function (className, key, relatedIds) {

};

// Modifies query so that it no longer has $in on relation fields, or
// equal-to-pointer constraints on relation fields.
// Returns a promise that resolves when query is mutated
// TODO: this only handles one of these at a time - make it handle more
ExportAdapter.prototype.reduceInRelation = function (className, query, schema) {
  // Search for an in-relation or equal-to-relation
};

// Modifies query so that it no longer has $relatedTo
// Returns a promise that resolves when query is mutated
ExportAdapter.prototype.reduceRelationKeys = function (className, query) {

};

// Does a find with "smart indexing".
// Currently this just means, if it needs a geoindex and there is
// none, then build the geoindex.
// This could be improved a lot but it's not clear if that's a good
// idea. Or even if this behavior is a good idea.
ExportAdapter.prototype.smartFind = function (coll, where, options) {

};

// Runs a query on the database.
// Returns a promise that resolves to a list of items.
// Options:
//   skip    number of results to skip.
//   limit   limit to this number of results.
//   sort    an object where keys are the fields to sort by.
//           the value is +1 for ascending, -1 for descending.
//   count   run a count instead of returning results.
//   acl     restrict this operation with an ACL for the provided array
//           of user objectIds and roles. acl: null means no user.
//           when this field is not present, don't do anything regarding ACLs.
// TODO: make userIds not needed here. The db adapter shouldn't know
// anything about users, ideally. Then, improve the format of the ACL
// arg to work like the others.
ExportAdapter.prototype.find = function (className, query, options = {}) {

};

module.exports = ExportAdapter;
