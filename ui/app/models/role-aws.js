import Ember from 'ember';
import DS from 'ember-data';
import lazyCapabilities, { apiPath } from 'vault/macros/lazy-capabilities';
import { expandAttributeMeta } from 'vault/utils/field-to-attrs';

const { attr } = DS;
const { computed } = Ember;

const CREATE_FIELDS = ['name', 'credential_type', 'credential_types', 'role_arns', 'policy_arns', 'policy_document'];
export default DS.Model.extend({
  backend: attr('string', {
    readOnly: true,
  }),
  name: attr('string', {
    label: 'Role name',
    fieldValue: 'id',
    readOnly: true,
  }),
  credential_type: attr('string', {
    defaultValue: "iam_user",
  }),
  credential_types: attr({
    label: 'Credential Types',
    readOnly: true,
  }),
  role_arns: attr({
    editType: 'stringArray',
    label: 'Role ARNs',
  }),
  policy_arns: attr({
    editType: 'stringArray',
  }),
  policy_document: attr('string', {
    widget: 'json',
  }),
  /*arn: attr('string', {
    helpText: '',
  }),
  policy: attr('string', {
    helpText: '',
    widget: 'json',
  }),*/
  attrs: computed(function() {
    let keys = CREATE_FIELDS.slice(0);
    return expandAttributeMeta(this, keys);
  }),

  updatePath: lazyCapabilities(apiPath`${'backend'}/roles/${'id'}`, 'backend', 'id'),
  canDelete: computed.alias('updatePath.canDelete'),
  canEdit: computed.alias('updatePath.canUpdate'),
  canRead: computed.alias('updatePath.canRead'),

  generatePath: lazyCapabilities(apiPath`${'backend'}/creds/${'id'}`, 'backend', 'id'),
  canGenerate: computed.alias('generatePath.canUpdate'),

  stsPath: lazyCapabilities(apiPath`${'backend'}/sts/${'id'}`, 'backend', 'id'),
  canGenerateSTS: computed.alias('stsPath.canUpdate'),
});
