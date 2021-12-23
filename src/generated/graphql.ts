import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch(
      process.env.REACT_APP_CAPACT_GATEWAY_ENDPOINT as string,
      {
        method: "POST",
        ...{
          headers: {
            Authorization: `${process.env.REACT_APP_CAPACT_GATEWAY_ENDPOINT_AUTH_HEADER}`,
          },
        },
        body: JSON.stringify({ query, variables }),
      }
    );

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  };
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Arbitrary data */
  Any: any;
  /** Arbitrary input data in JSON string format */
  JSON: any;
  /** LockOwner defines owner name who locked a given TypeInstance */
  LockOwnerID: any;
  /** Regular expression for searching Action by name, e.g. upgrade-* */
  NameRegex: any;
  /** Name of a given node. Name is immutable between different revisions of a given node. */
  NodeName: any;
  /** Full path of a given node, e.g. cap.core.type.platform.kubernetes */
  NodePath: any;
  /** Pattern of the path of a given node, e.g. cap.core.type.platform.* */
  NodePathPattern: any;
  /** Path for the parent node, e.g. for Interface it is InterfaceGroup path. */
  NodePrefix: any;
  /** Time in ISO 8601 format */
  Timestamp: any;
  /** Version in semantic versioning, e.g. 1.1.0 */
  Version: any;
  /** Range of versions, e.g. "1.14.x, 1.15.0 - 1.15.3" */
  VersionRange: any;
};

/** Action describes user intention to resolve & execute a given Interface or Implementation. */
export type Action = {
  __typename?: "Action";
  /** Contains reference to the Implementation or Interface manifest */
  actionRef: ManifestReference;
  /** Indicates if user canceled the workflow. CURRENTLY NOT SUPPORTED. */
  cancel: Scalars["Boolean"];
  createdAt: Scalars["Timestamp"];
  /**
   * Specifies whether the Action performs server-side test without actually running the Action.
   * For now it only lints the rendered Argo manifests and does not execute any workflow.
   */
  dryRun: Scalars["Boolean"];
  input?: Maybe<ActionInput>;
  name: Scalars["String"];
  output?: Maybe<ActionOutput>;
  renderedAction?: Maybe<Scalars["Any"]>;
  /** CURRENTLY NOT IMPLEMENTED. */
  renderedActionOverride?: Maybe<Scalars["Any"]>;
  /** CURRENTLY NOT IMPLEMENTED. */
  renderingAdvancedMode?: Maybe<ActionRenderingAdvancedMode>;
  /** Indicates if user approved this Action to run */
  run: Scalars["Boolean"];
  status?: Maybe<ActionStatus>;
};

/** Client input of Action details, that are used for create and update Action operations (PUT-like operation) */
export type ActionDetailsInput = {
  /** Contains reference to the Implementation or Interface manifest */
  actionRef: ManifestReferenceInput;
  /** Enables advanced rendering mode for Action. CURRENTLY NOT IMPLEMENTED. */
  advancedRendering?: InputMaybe<Scalars["Boolean"]>;
  /**
   * Specifies whether the Action performs server-side test without actually running the Action
   * For now it only lints the rendered Argo manifests and does not execute any workflow.
   */
  dryRun?: InputMaybe<Scalars["Boolean"]>;
  input?: InputMaybe<ActionInputData>;
  name: Scalars["String"];
  /** Used to override the rendered action. CURRENTLY NOT IMPLEMENTED. */
  renderedActionOverride?: InputMaybe<Scalars["JSON"]>;
};

/** Set of filters for Action list */
export type ActionFilter = {
  interfaceRef?: InputMaybe<ManifestReferenceInput>;
  nameRegex?: InputMaybe<Scalars["NameRegex"]>;
  phase?: InputMaybe<ActionStatusPhase>;
};

/** Describes input of an Action */
export type ActionInput = {
  __typename?: "ActionInput";
  /** Contains the one-time Action policy, which is merged with other Capact policies */
  actionPolicy?: Maybe<Policy>;
  /** Validated against JSON schema from Interface */
  parameters?: Maybe<Scalars["Any"]>;
  typeInstances: Array<InputTypeInstanceDetails>;
};

/** Client input that modifies input of a given Action */
export type ActionInputData = {
  /** Contains the optional one-time Action policy, which is merged with other Capact policies */
  actionPolicy?: InputMaybe<PolicyInput>;
  /** During rendering, it is validated against JSON schema from Interface of the resolved action */
  parameters?: InputMaybe<Scalars["JSON"]>;
  /** Required and optional TypeInstances for Action */
  typeInstances?: InputMaybe<Array<InputTypeInstanceData>>;
};

/** Describes output of an Action */
export type ActionOutput = {
  __typename?: "ActionOutput";
  typeInstances: Array<OutputTypeInstanceDetails>;
};

/** Properties related to Action advanced rendering. CURRENTLY NOT IMPLEMENTED. */
export type ActionRenderingAdvancedMode = {
  __typename?: "ActionRenderingAdvancedMode";
  enabled: Scalars["Boolean"];
  /** Optional TypeInstances for current rendering iteration */
  typeInstancesForRenderingIteration: Array<InputTypeInstanceToProvide>;
};

/** Status of the Action */
export type ActionStatus = {
  __typename?: "ActionStatus";
  /** CURRENTLY NOT IMPLEMENTED. */
  canceledBy?: Maybe<UserInfo>;
  /** CURRENTLY NOT IMPLEMENTED. */
  createdBy?: Maybe<UserInfo>;
  message?: Maybe<Scalars["String"]>;
  phase: ActionStatusPhase;
  /** CURRENTLY NOT IMPLEMENTED. */
  runBy?: Maybe<UserInfo>;
  runner?: Maybe<RunnerStatus>;
  timestamp: Scalars["Timestamp"];
};

/** Current phase of the Action */
export enum ActionStatusPhase {
  AdvancedModeRenderingIteration = "ADVANCED_MODE_RENDERING_ITERATION",
  BeingCanceled = "BEING_CANCELED",
  BeingRendered = "BEING_RENDERED",
  Canceled = "CANCELED",
  Failed = "FAILED",
  Initial = "INITIAL",
  ReadyToRun = "READY_TO_RUN",
  Running = "RUNNING",
  Succeeded = "SUCCEEDED",
}

export type AdditionalParameter = {
  __typename?: "AdditionalParameter";
  name: Scalars["String"];
  value: Scalars["Any"];
};

export type AdditionalParameterInput = {
  name: Scalars["String"];
  value: Scalars["Any"];
};

export type AdditionalTypeInstanceReference = {
  __typename?: "AdditionalTypeInstanceReference";
  id: Scalars["ID"];
  name: Scalars["String"];
};

export type AdditionalTypeInstanceReferenceInput = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

/** Input used for continuing Action rendering in advanced mode */
export type AdvancedModeContinueRenderingInput = {
  /** Optional TypeInstances for a given rendering iteration */
  typeInstances?: InputMaybe<Array<InputTypeInstanceData>>;
};

export type Attribute = {
  __typename?: "Attribute";
  latestRevision?: Maybe<AttributeRevision>;
  name: Scalars["NodeName"];
  path: Scalars["NodePath"];
  prefix: Scalars["NodePrefix"];
  revision?: Maybe<AttributeRevision>;
  revisions: Array<AttributeRevision>;
};

export type AttributeRevisionArgs = {
  revision: Scalars["Version"];
};

export type AttributeFilter = {
  pathPattern?: InputMaybe<Scalars["NodePathPattern"]>;
};

export type AttributeFilterInput = {
  path: Scalars["NodePath"];
  /** If not provided, any revision of the Attribute applies to this filter */
  revision?: InputMaybe<Scalars["Version"]>;
  rule?: InputMaybe<FilterRule>;
};

export type AttributeReference = {
  __typename?: "AttributeReference";
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
};

export type AttributeReferenceInput = {
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
};

export type AttributeRevision = {
  __typename?: "AttributeRevision";
  metadata: GenericMetadata;
  revision: Scalars["Version"];
  spec?: Maybe<AttributeSpec>;
};

export type AttributeSpec = {
  __typename?: "AttributeSpec";
  additionalRefs: Array<Scalars["NodePath"]>;
};

export type CreateTypeInstanceInput = {
  /** Used to define the relationships, between the created TypeInstances */
  alias?: InputMaybe<Scalars["String"]>;
  attributes?: InputMaybe<Array<AttributeReferenceInput>>;
  createdBy?: InputMaybe<Scalars["String"]>;
  typeRef: TypeInstanceTypeReferenceInput;
  value?: InputMaybe<Scalars["Any"]>;
};

export type CreateTypeInstanceOutput = {
  __typename?: "CreateTypeInstanceOutput";
  alias: Scalars["String"];
  id: Scalars["ID"];
};

export type CreateTypeInstancesInput = {
  typeInstances: Array<CreateTypeInstanceInput>;
  usesRelations: Array<TypeInstanceUsesRelationInput>;
};

export enum FilterRule {
  Exclude = "EXCLUDE",
  Include = "INCLUDE",
}

export type GenericMetadata = MetadataBaseFields & {
  __typename?: "GenericMetadata";
  description: Scalars["String"];
  displayName?: Maybe<Scalars["String"]>;
  documentationURL?: Maybe<Scalars["String"]>;
  iconURL?: Maybe<Scalars["String"]>;
  maintainers: Array<Maintainer>;
  name: Scalars["NodeName"];
  path: Scalars["NodePath"];
  prefix?: Maybe<Scalars["NodePrefix"]>;
  supportURL?: Maybe<Scalars["String"]>;
};

export enum HttpRequestMethod {
  Get = "GET",
  Post = "POST",
}

export type Implementation = {
  __typename?: "Implementation";
  latestRevision?: Maybe<ImplementationRevision>;
  name: Scalars["NodeName"];
  path: Scalars["NodePath"];
  prefix: Scalars["NodePrefix"];
  revision?: Maybe<ImplementationRevision>;
  revisions: Array<ImplementationRevision>;
};

export type ImplementationRevisionArgs = {
  revision: Scalars["Version"];
};

export type ImplementationAction = {
  __typename?: "ImplementationAction";
  args?: Maybe<Scalars["Any"]>;
  /** The Interface or Implementation of a runner, which handles the execution, for example, cap.interface.runner.helm3.run */
  runnerInterface: Scalars["String"];
};

export type ImplementationAdditionalInput = {
  __typename?: "ImplementationAdditionalInput";
  parameters?: Maybe<Array<ImplementationAdditionalInputParameter>>;
  typeInstances?: Maybe<Array<InputTypeInstance>>;
};

export type ImplementationAdditionalInputParameter = {
  __typename?: "ImplementationAdditionalInputParameter";
  name: Scalars["String"];
  typeRef: TypeReference;
};

export type ImplementationAdditionalOutput = {
  __typename?: "ImplementationAdditionalOutput";
  typeInstances: Array<OutputTypeInstance>;
};

export type ImplementationFilter = {
  pathPattern?: InputMaybe<Scalars["NodePathPattern"]>;
};

export type ImplementationImport = {
  __typename?: "ImplementationImport";
  alias?: Maybe<Scalars["String"]>;
  appVersion?: Maybe<Scalars["VersionRange"]>;
  interfaceGroupPath: Scalars["NodePath"];
  methods: Array<ImplementationImportMethod>;
};

export type ImplementationImportMethod = {
  __typename?: "ImplementationImportMethod";
  name: Scalars["NodeName"];
  /** If not provided, latest revision for a given Interface is used */
  revision?: Maybe<Scalars["Version"]>;
};

export type ImplementationMetadata = MetadataBaseFields & {
  __typename?: "ImplementationMetadata";
  attributes: Array<AttributeRevision>;
  description: Scalars["String"];
  displayName?: Maybe<Scalars["String"]>;
  documentationURL?: Maybe<Scalars["String"]>;
  iconURL?: Maybe<Scalars["String"]>;
  license: License;
  maintainers: Array<Maintainer>;
  name: Scalars["NodeName"];
  path: Scalars["NodePath"];
  prefix?: Maybe<Scalars["NodePrefix"]>;
  supportURL?: Maybe<Scalars["String"]>;
};

export type ImplementationRequirement = {
  __typename?: "ImplementationRequirement";
  allOf: Array<ImplementationRequirementItem>;
  anyOf: Array<ImplementationRequirementItem>;
  oneOf: Array<ImplementationRequirementItem>;
  prefix: Scalars["NodePrefix"];
};

export type ImplementationRequirementItem = {
  __typename?: "ImplementationRequirementItem";
  /** If provided, the TypeInstance of the Type, configured in policy, is injected to the workflow under the alias. */
  alias?: Maybe<Scalars["String"]>;
  typeRef: TypeReference;
  /**
   * Holds the configuration constraints for the given entry based on Type value.
   * Currently not supported.
   */
  valueConstraints?: Maybe<Scalars["Any"]>;
};

export type ImplementationRevision = {
  __typename?: "ImplementationRevision";
  interfaces: Array<InterfaceRevision>;
  metadata: ImplementationMetadata;
  revision: Scalars["Version"];
  spec: ImplementationSpec;
};

/**
 * Dedicated input type for filtering ImplementationRevisions in future resolver
 * `InterfaceRevision.implementationRevisionsForRequirements`.
 *
 * Currently used only for Hub Go client package as the server-side resolver is not implemented.
 */
export type ImplementationRevisionFilter = {
  attributes?: InputMaybe<Array<AttributeFilterInput>>;
  pathPattern?: InputMaybe<Scalars["NodePathPattern"]>;
  /**
   * Filter by Implementations, which have requirements injection satisfied.
   * If provided, all TypeInstance values are merged into `requirementsSatisfiedBy` filter values, and, in a result,
   * both filters `requirementsSatisfiedBy` and `requiredTypeInstancesInjectionSatisfiedBy` are used.
   */
  requiredTypeInstancesInjectionSatisfiedBy?: InputMaybe<
    Array<InputMaybe<TypeInstanceValue>>
  >;
  /**
   * If provided, Implementations are filtered by the ones that have satisfied requirements with provided TypeInstance values.
   * For example, to find all Implementations that can be run on a given system, user can provide values of all existing TypeInstances.
   */
  requirementsSatisfiedBy?: InputMaybe<Array<TypeInstanceValue>>;
  /**
   * If provided, the ImplementationRevisions for a given Interface will be filtered
   * according to provided Type references looked up in the `Implementation.spec.requires` field.
   *
   * For every item in the array, the returned ImplementationRevisions must specify
   * such TypeReference in `Implementation.spec.requires` in any of the sections: oneOf, anyOf or allOf.
   */
  requires?: InputMaybe<Array<InputMaybe<TypeReferenceWithOptionalRevision>>>;
};

export type ImplementationSpec = {
  __typename?: "ImplementationSpec";
  action: ImplementationAction;
  additionalInput?: Maybe<ImplementationAdditionalInput>;
  additionalOutput?: Maybe<ImplementationAdditionalOutput>;
  appVersion: Scalars["VersionRange"];
  implements: Array<InterfaceReference>;
  imports?: Maybe<Array<ImplementationImport>>;
  outputTypeInstanceRelations: Array<TypeInstanceRelationItem>;
  requires: Array<ImplementationRequirement>;
};

export type InputParameter = {
  __typename?: "InputParameter";
  jsonSchema?: Maybe<Scalars["Any"]>;
  name: Scalars["String"];
  typeRef?: Maybe<TypeReference>;
};

export type InputTypeInstance = TypeInstanceFields & {
  __typename?: "InputTypeInstance";
  name: Scalars["String"];
  typeRef: TypeReference;
  verbs: Array<TypeInstanceOperationVerb>;
};

/** Client input for Input TypeInstance */
export type InputTypeInstanceData = {
  id: Scalars["ID"];
  name: Scalars["String"];
};

/** Describes input TypeInstance of an Action */
export type InputTypeInstanceDetails = {
  __typename?: "InputTypeInstanceDetails";
  id: Scalars["ID"];
  name: Scalars["String"];
};

/** Describes optional input TypeInstance of advanced rendering iteration */
export type InputTypeInstanceToProvide = {
  __typename?: "InputTypeInstanceToProvide";
  name: Scalars["String"];
  typeRef: ManifestReference;
};

export type Interface = {
  __typename?: "Interface";
  latestRevision?: Maybe<InterfaceRevision>;
  name: Scalars["NodeName"];
  path: Scalars["NodePath"];
  prefix: Scalars["NodePrefix"];
  revision?: Maybe<InterfaceRevision>;
  revisions: Array<InterfaceRevision>;
};

export type InterfaceRevisionArgs = {
  revision: Scalars["Version"];
};

export type InterfaceFilter = {
  pathPattern?: InputMaybe<Scalars["NodePathPattern"]>;
};

export type InterfaceGroup = {
  __typename?: "InterfaceGroup";
  interfaces: Array<Interface>;
  metadata: GenericMetadata;
  path: Scalars["NodePath"];
};

export type InterfaceGroupInterfacesArgs = {
  filter?: InputMaybe<InterfaceFilter>;
};

export type InterfaceGroupFilter = {
  pathPattern?: InputMaybe<Scalars["NodePathPattern"]>;
};

export type InterfaceInput = {
  __typename?: "InterfaceInput";
  parameters: Array<InputParameter>;
  typeInstances: Array<Maybe<InputTypeInstance>>;
};

export type InterfaceOutput = {
  __typename?: "InterfaceOutput";
  typeInstances: Array<Maybe<OutputTypeInstance>>;
};

export type InterfaceReference = {
  __typename?: "InterfaceReference";
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
};

export type InterfaceRevision = {
  __typename?: "InterfaceRevision";
  implementationRevisions: Array<ImplementationRevision>;
  metadata: GenericMetadata;
  revision: Scalars["Version"];
  spec: InterfaceSpec;
};

export type InterfaceSpec = {
  __typename?: "InterfaceSpec";
  input: InterfaceInput;
  output: InterfaceOutput;
};

export type LatestSemVerTaggingStrategy = {
  __typename?: "LatestSemVerTaggingStrategy";
  pointsTo: SemVerTaggingStrategyTags;
};

export type License = {
  __typename?: "License";
  name: Scalars["String"];
};

export type LockTypeInstancesInput = {
  ids: Array<Scalars["ID"]>;
  ownerID: Scalars["LockOwnerID"];
};

export type Maintainer = {
  __typename?: "Maintainer";
  email: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export type ManifestReference = {
  __typename?: "ManifestReference";
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
};

export type ManifestReferenceInput = {
  /** Full path for the manifest */
  path: Scalars["NodePath"];
  /** If not provided, latest revision for a given manifest is used */
  revision?: InputMaybe<Scalars["Version"]>;
};

export type ManifestReferenceWithOptionalRevision = {
  __typename?: "ManifestReferenceWithOptionalRevision";
  path: Scalars["NodePath"];
  revision?: Maybe<Scalars["Version"]>;
};

export type MetadataBaseFields = {
  description: Scalars["String"];
  displayName?: Maybe<Scalars["String"]>;
  documentationURL?: Maybe<Scalars["String"]>;
  iconURL?: Maybe<Scalars["String"]>;
  maintainers: Array<Maintainer>;
  name?: Maybe<Scalars["NodeName"]>;
  path?: Maybe<Scalars["NodePath"]>;
  prefix?: Maybe<Scalars["NodePrefix"]>;
  supportURL?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** CURRENTLY NOT IMPLEMENTED. */
  cancelAction: Action;
  /** CURRENTLY NOT IMPLEMENTED. */
  continueAdvancedRendering: Action;
  createAction: Action;
  createTypeInstance: TypeInstance;
  createTypeInstances: Array<CreateTypeInstanceOutput>;
  /** DeleteAction does not remove the resources, which were created or modified by this Action. */
  deleteAction: Action;
  deleteTypeInstance: Scalars["ID"];
  /**
   * Mark given TypeInstances as locked by a given owner.
   * If at least one TypeInstance is already locked with different OwnerID, an error is returned.
   */
  lockTypeInstances: Array<Scalars["ID"]>;
  runAction: Action;
  /**
   * Remove lock from given TypeInstances.
   * If at least one TypeInstance was not locked by a given owner, an error is returned.
   */
  unlockTypeInstances: Array<Scalars["ID"]>;
  updateAction: Action;
  updatePolicy: Policy;
  updateTypeInstances: Array<TypeInstance>;
};

export type MutationCancelActionArgs = {
  name: Scalars["String"];
};

export type MutationContinueAdvancedRenderingArgs = {
  actionName: Scalars["String"];
  in: AdvancedModeContinueRenderingInput;
};

export type MutationCreateActionArgs = {
  in?: InputMaybe<ActionDetailsInput>;
};

export type MutationCreateTypeInstanceArgs = {
  in: CreateTypeInstanceInput;
};

export type MutationCreateTypeInstancesArgs = {
  in: CreateTypeInstancesInput;
};

export type MutationDeleteActionArgs = {
  name: Scalars["String"];
};

export type MutationDeleteTypeInstanceArgs = {
  id: Scalars["ID"];
  ownerID?: InputMaybe<Scalars["LockOwnerID"]>;
};

export type MutationLockTypeInstancesArgs = {
  in: LockTypeInstancesInput;
};

export type MutationRunActionArgs = {
  name: Scalars["String"];
};

export type MutationUnlockTypeInstancesArgs = {
  in: UnlockTypeInstancesInput;
};

export type MutationUpdateActionArgs = {
  in: ActionDetailsInput;
};

export type MutationUpdatePolicyArgs = {
  in: PolicyInput;
};

export type MutationUpdateTypeInstancesArgs = {
  in: Array<InputMaybe<UpdateTypeInstancesInput>>;
};

export type Node = {
  id: Scalars["ID"];
};

export type OutputTypeInstance = TypeInstanceFields & {
  __typename?: "OutputTypeInstance";
  name: Scalars["String"];
  typeRef: TypeReference;
};

/** Describes output TypeInstance of an Action */
export type OutputTypeInstanceDetails = {
  __typename?: "OutputTypeInstanceDetails";
  id: Scalars["ID"];
  typeRef: ManifestReference;
};

export type Policy = {
  __typename?: "Policy";
  rules: Array<RulesForInterface>;
};

export type PolicyInput = {
  rules: Array<RulesForInterfaceInput>;
};

export type PolicyRule = {
  __typename?: "PolicyRule";
  implementationConstraints?: Maybe<PolicyRuleImplementationConstraints>;
  inject?: Maybe<PolicyRuleInjectData>;
};

export type PolicyRuleImplementationConstraints = {
  __typename?: "PolicyRuleImplementationConstraints";
  /** Refers a specific Attribute by path and optional revision. */
  attributes?: Maybe<Array<ManifestReferenceWithOptionalRevision>>;
  /** Refers a specific Implementation with exact path. */
  path?: Maybe<Scalars["NodePath"]>;
  /** Refers a specific required TypeInstance by path and optional revision. */
  requires?: Maybe<Array<ManifestReferenceWithOptionalRevision>>;
};

export type PolicyRuleImplementationConstraintsInput = {
  /** Refers a specific Attribute by path and optional revision. */
  attributes?: InputMaybe<Array<ManifestReferenceInput>>;
  /** Refers a specific Implementation with exact path. */
  path?: InputMaybe<Scalars["NodePath"]>;
  /** Refers a specific required TypeInstance by path and optional revision. */
  requires?: InputMaybe<Array<ManifestReferenceInput>>;
};

export type PolicyRuleInjectData = {
  __typename?: "PolicyRuleInjectData";
  additionalParameters?: Maybe<Array<AdditionalParameter>>;
  additionalTypeInstances?: Maybe<Array<AdditionalTypeInstanceReference>>;
  requiredTypeInstances?: Maybe<Array<RequiredTypeInstanceReference>>;
};

export type PolicyRuleInjectDataInput = {
  additionalParameters?: InputMaybe<Array<AdditionalParameterInput>>;
  additionalTypeInstances?: InputMaybe<
    Array<AdditionalTypeInstanceReferenceInput>
  >;
  requiredTypeInstances?: InputMaybe<Array<RequiredTypeInstanceReferenceInput>>;
};

export type PolicyRuleInput = {
  implementationConstraints?: InputMaybe<PolicyRuleImplementationConstraintsInput>;
  inject?: InputMaybe<PolicyRuleInjectDataInput>;
};

export type Query = {
  __typename?: "Query";
  action?: Maybe<Action>;
  actions: Array<Action>;
  attribute?: Maybe<Attribute>;
  attributes: Array<Attribute>;
  implementation?: Maybe<Implementation>;
  implementations: Array<Implementation>;
  interface?: Maybe<Interface>;
  interfaceGroup?: Maybe<InterfaceGroup>;
  interfaceGroups: Array<InterfaceGroup>;
  interfaces: Array<Interface>;
  node?: Maybe<Node>;
  policy: Policy;
  repoMetadata?: Maybe<RepoMetadata>;
  type?: Maybe<Type>;
  typeInstance?: Maybe<TypeInstance>;
  typeInstances: Array<TypeInstance>;
  types: Array<Type>;
};

export type QueryActionArgs = {
  name: Scalars["String"];
};

export type QueryActionsArgs = {
  filter?: InputMaybe<ActionFilter>;
};

export type QueryAttributeArgs = {
  path: Scalars["NodePath"];
};

export type QueryAttributesArgs = {
  filter?: InputMaybe<AttributeFilter>;
};

export type QueryImplementationArgs = {
  path: Scalars["NodePath"];
};

export type QueryImplementationsArgs = {
  filter?: InputMaybe<ImplementationFilter>;
};

export type QueryInterfaceArgs = {
  path: Scalars["NodePath"];
};

export type QueryInterfaceGroupArgs = {
  path: Scalars["NodePath"];
};

export type QueryInterfaceGroupsArgs = {
  filter?: InputMaybe<InterfaceGroupFilter>;
};

export type QueryInterfacesArgs = {
  filter?: InputMaybe<InterfaceFilter>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type QueryTypeArgs = {
  path: Scalars["NodePath"];
};

export type QueryTypeInstanceArgs = {
  id: Scalars["ID"];
};

export type QueryTypeInstancesArgs = {
  filter?: InputMaybe<TypeInstanceFilter>;
};

export type QueryTypesArgs = {
  filter?: InputMaybe<TypeFilter>;
};

export type RepoImplementationAppVersionConfig = {
  __typename?: "RepoImplementationAppVersionConfig";
  semVerTaggingStrategy: SemVerTaggingStrategy;
};

export type RepoImplementationConfig = {
  __typename?: "RepoImplementationConfig";
  appVersion: RepoImplementationAppVersionConfig;
};

export type RepoMetadata = {
  __typename?: "RepoMetadata";
  latestRevision?: Maybe<RepoMetadataRevision>;
  name: Scalars["NodeName"];
  path: Scalars["NodePath"];
  prefix: Scalars["NodePrefix"];
  revision?: Maybe<RepoMetadataRevision>;
  revisions: Array<RepoMetadataRevision>;
};

export type RepoMetadataRevisionArgs = {
  revision: Scalars["Version"];
};

export type RepoMetadataRevision = {
  __typename?: "RepoMetadataRevision";
  metadata: GenericMetadata;
  revision: Scalars["Version"];
  spec: RepoMetadataSpec;
};

export type RepoMetadataSpec = {
  __typename?: "RepoMetadataSpec";
  hubVersion: Scalars["Version"];
  implementation: RepoImplementationConfig;
  ocfVersion: RepoOcfVersion;
};

export type RepoOcfVersion = {
  __typename?: "RepoOCFVersion";
  default: Scalars["Version"];
  supported: Array<Scalars["Version"]>;
};

export type RequiredTypeInstanceReference = {
  __typename?: "RequiredTypeInstanceReference";
  description?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type RequiredTypeInstanceReferenceInput = {
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
};

export type RulesForInterface = {
  __typename?: "RulesForInterface";
  interface: ManifestReferenceWithOptionalRevision;
  oneOf: Array<PolicyRule>;
};

export type RulesForInterfaceInput = {
  interface: ManifestReferenceInput;
  oneOf: Array<PolicyRuleInput>;
};

/** Additional Action status from the Runner */
export type RunnerStatus = {
  __typename?: "RunnerStatus";
  /** Status of a given Runner e.g. Argo Workflow Runner status object with argoWorkflowRef field */
  status?: Maybe<Scalars["Any"]>;
};

export type SemVerTaggingStrategy = {
  __typename?: "SemVerTaggingStrategy";
  latest: LatestSemVerTaggingStrategy;
};

export enum SemVerTaggingStrategyTags {
  Edge = "EDGE",
  Stable = "STABLE",
}

export type Type = {
  __typename?: "Type";
  latestRevision?: Maybe<TypeRevision>;
  name: Scalars["NodeName"];
  path: Scalars["NodePath"];
  prefix: Scalars["NodePrefix"];
  revision?: Maybe<TypeRevision>;
  revisions: Array<TypeRevision>;
};

export type TypeRevisionArgs = {
  revision: Scalars["Version"];
};

export type TypeFilter = {
  pathPattern?: InputMaybe<Scalars["NodePathPattern"]>;
};

export type TypeInstance = {
  __typename?: "TypeInstance";
  firstResourceVersion?: Maybe<TypeInstanceResourceVersion>;
  id: Scalars["ID"];
  latestResourceVersion?: Maybe<TypeInstanceResourceVersion>;
  lockedBy?: Maybe<Scalars["LockOwnerID"]>;
  previousResourceVersion?: Maybe<TypeInstanceResourceVersion>;
  resourceVersion?: Maybe<TypeInstanceResourceVersion>;
  resourceVersions: Array<TypeInstanceResourceVersion>;
  /** Common properties for all TypeInstances which cannot be changed */
  typeRef: TypeInstanceTypeReference;
  usedBy: Array<TypeInstance>;
  uses: Array<TypeInstance>;
};

export type TypeInstanceResourceVersionArgs = {
  resourceVersion: Scalars["Int"];
};

export type TypeInstanceFields = {
  name: Scalars["String"];
  typeRef: TypeReference;
};

export type TypeInstanceFilter = {
  attributes?: InputMaybe<Array<InputMaybe<AttributeFilterInput>>>;
  createdBy?: InputMaybe<Scalars["String"]>;
  typeRef?: InputMaybe<TypeRefFilterInput>;
};

/** CURRENTLY NOT IMPLEMENTED */
export type TypeInstanceInstrumentation = {
  __typename?: "TypeInstanceInstrumentation";
  health?: Maybe<TypeInstanceInstrumentationHealth>;
  metrics?: Maybe<TypeInstanceInstrumentationMetrics>;
};

/** CURRENTLY NOT IMPLEMENTED */
export type TypeInstanceInstrumentationHealth = {
  __typename?: "TypeInstanceInstrumentationHealth";
  method?: Maybe<HttpRequestMethod>;
  status?: Maybe<TypeInstanceInstrumentationHealthStatus>;
  url?: Maybe<Scalars["String"]>;
};

/** CURRENTLY NOT IMPLEMENTED */
export enum TypeInstanceInstrumentationHealthStatus {
  Failing = "FAILING",
  Ready = "READY",
  Unknown = "UNKNOWN",
}

/** CURRENTLY NOT IMPLEMENTED */
export type TypeInstanceInstrumentationMetrics = {
  __typename?: "TypeInstanceInstrumentationMetrics";
  dashboards: Array<TypeInstanceInstrumentationMetricsDashboard>;
  endpoint?: Maybe<Scalars["String"]>;
  regex?: Maybe<Scalars["String"]>;
};

/** CURRENTLY NOT IMPLEMENTED */
export type TypeInstanceInstrumentationMetricsDashboard = {
  __typename?: "TypeInstanceInstrumentationMetricsDashboard";
  url: Scalars["String"];
};

export enum TypeInstanceOperationVerb {
  Create = "CREATE",
  Delete = "DELETE",
  Get = "GET",
  List = "LIST",
  Update = "UPDATE",
}

export type TypeInstanceRelationItem = {
  __typename?: "TypeInstanceRelationItem";
  typeInstanceName: Scalars["String"];
  /** Contains list of Type Instance names, which a given TypeInstance uses (depends on) */
  uses?: Maybe<Array<Scalars["String"]>>;
};

export type TypeInstanceResourceVersion = {
  __typename?: "TypeInstanceResourceVersion";
  createdBy?: Maybe<Scalars["String"]>;
  metadata: TypeInstanceResourceVersionMetadata;
  resourceVersion: Scalars["Int"];
  spec: TypeInstanceResourceVersionSpec;
};

export type TypeInstanceResourceVersionMetadata = {
  __typename?: "TypeInstanceResourceVersionMetadata";
  attributes?: Maybe<Array<AttributeReference>>;
};

export type TypeInstanceResourceVersionSpec = {
  __typename?: "TypeInstanceResourceVersionSpec";
  /** CURRENTLY NOT IMPLEMENTED */
  instrumentation?: Maybe<TypeInstanceInstrumentation>;
  value: Scalars["Any"];
};

export type TypeInstanceTypeReference = {
  __typename?: "TypeInstanceTypeReference";
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
};

export type TypeInstanceTypeReferenceInput = {
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
};

export type TypeInstanceUsesRelationInput = {
  /** Can be existing TypeInstance ID or alias of a TypeInstance from typeInstances list */
  from: Scalars["String"];
  /** Can be existing TypeInstance ID or alias of a TypeInstance from typeInstances list */
  to: Scalars["String"];
};

export type TypeInstanceValue = {
  typeRef: TypeReferenceInput;
  /**
   * Currently not supported.
   * Value of the available requirement. If not provided, all valueConstraints conditions are treated as satisfied.
   */
  value?: InputMaybe<Scalars["Any"]>;
};

export type TypeMetadata = MetadataBaseFields & {
  __typename?: "TypeMetadata";
  attributes: Array<AttributeRevision>;
  description: Scalars["String"];
  displayName?: Maybe<Scalars["String"]>;
  documentationURL?: Maybe<Scalars["String"]>;
  iconURL?: Maybe<Scalars["String"]>;
  maintainers: Array<Maintainer>;
  name: Scalars["NodeName"];
  path: Scalars["NodePath"];
  prefix?: Maybe<Scalars["NodePrefix"]>;
  supportURL?: Maybe<Scalars["String"]>;
};

export type TypeRefFilterInput = {
  path: Scalars["NodePath"];
  /** If not provided, it returns TypeInstances for all revisions of given Type */
  revision?: InputMaybe<Scalars["Version"]>;
};

export type TypeReference = {
  __typename?: "TypeReference";
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
};

export type TypeReferenceInput = {
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
};

export type TypeReferenceWithOptionalRevision = {
  path: Scalars["NodePath"];
  revision?: InputMaybe<Scalars["Version"]>;
};

export type TypeRevision = {
  __typename?: "TypeRevision";
  metadata: TypeMetadata;
  revision: Scalars["Version"];
  spec: TypeSpec;
};

export type TypeSpec = {
  __typename?: "TypeSpec";
  additionalRefs?: Maybe<Array<Scalars["NodePath"]>>;
  jsonSchema?: Maybe<Scalars["Any"]>;
};

export type UnlockTypeInstancesInput = {
  ids: Array<Scalars["ID"]>;
  ownerID: Scalars["LockOwnerID"];
};

/** At least one property needs to be specified. */
export type UpdateTypeInstanceInput = {
  /** The attributes property is optional. If not provided, previous value is used. */
  attributes?: InputMaybe<Array<AttributeReferenceInput>>;
  /** The value property is optional. If not provided, previous value is used. */
  value?: InputMaybe<Scalars["Any"]>;
};

export type UpdateTypeInstancesInput = {
  createdBy?: InputMaybe<Scalars["String"]>;
  id: Scalars["ID"];
  /**
   * Allows you to update TypeInstances which are locked by a given ownerID. If not provided,
   * you can update only those TypeInstances which are not locked.
   */
  ownerID?: InputMaybe<Scalars["LockOwnerID"]>;
  typeInstance: UpdateTypeInstanceInput;
};

/** Stores user information */
export type UserInfo = {
  __typename?: "UserInfo";
  extra?: Maybe<Scalars["Any"]>;
  groups: Array<Scalars["String"]>;
  username: Scalars["String"];
};

/** Generated Date object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jDate = {
  __typename?: "_Neo4jDate";
  day?: Maybe<Scalars["Int"]>;
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) Date value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars["String"]>;
  month?: Maybe<Scalars["Int"]>;
  year?: Maybe<Scalars["Int"]>;
};

/** Generated Date input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jDateInput = {
  day?: InputMaybe<Scalars["Int"]>;
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) Date value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/date/#functions-date-create-string). */
  formatted?: InputMaybe<Scalars["String"]>;
  month?: InputMaybe<Scalars["Int"]>;
  year?: InputMaybe<Scalars["Int"]>;
};

/** Generated DateTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jDateTime = {
  __typename?: "_Neo4jDateTime";
  day?: Maybe<Scalars["Int"]>;
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) DateTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars["String"]>;
  hour?: Maybe<Scalars["Int"]>;
  microsecond?: Maybe<Scalars["Int"]>;
  millisecond?: Maybe<Scalars["Int"]>;
  minute?: Maybe<Scalars["Int"]>;
  month?: Maybe<Scalars["Int"]>;
  nanosecond?: Maybe<Scalars["Int"]>;
  second?: Maybe<Scalars["Int"]>;
  timezone?: Maybe<Scalars["String"]>;
  year?: Maybe<Scalars["Int"]>;
};

/** Generated DateTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jDateTimeInput = {
  day?: InputMaybe<Scalars["Int"]>;
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) DateTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/datetime/#functions-datetime-create-string). */
  formatted?: InputMaybe<Scalars["String"]>;
  hour?: InputMaybe<Scalars["Int"]>;
  microsecond?: InputMaybe<Scalars["Int"]>;
  millisecond?: InputMaybe<Scalars["Int"]>;
  minute?: InputMaybe<Scalars["Int"]>;
  month?: InputMaybe<Scalars["Int"]>;
  nanosecond?: InputMaybe<Scalars["Int"]>;
  second?: InputMaybe<Scalars["Int"]>;
  timezone?: InputMaybe<Scalars["String"]>;
  year?: InputMaybe<Scalars["Int"]>;
};

/** Generated LocalDateTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jLocalDateTime = {
  __typename?: "_Neo4jLocalDateTime";
  day?: Maybe<Scalars["Int"]>;
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) LocalDateTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars["String"]>;
  hour?: Maybe<Scalars["Int"]>;
  microsecond?: Maybe<Scalars["Int"]>;
  millisecond?: Maybe<Scalars["Int"]>;
  minute?: Maybe<Scalars["Int"]>;
  month?: Maybe<Scalars["Int"]>;
  nanosecond?: Maybe<Scalars["Int"]>;
  second?: Maybe<Scalars["Int"]>;
  year?: Maybe<Scalars["Int"]>;
};

/** Generated LocalDateTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jLocalDateTimeInput = {
  day?: InputMaybe<Scalars["Int"]>;
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) LocalDateTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/localdatetime/#functions-localdatetime-create-string). */
  formatted?: InputMaybe<Scalars["String"]>;
  hour?: InputMaybe<Scalars["Int"]>;
  microsecond?: InputMaybe<Scalars["Int"]>;
  millisecond?: InputMaybe<Scalars["Int"]>;
  minute?: InputMaybe<Scalars["Int"]>;
  month?: InputMaybe<Scalars["Int"]>;
  nanosecond?: InputMaybe<Scalars["Int"]>;
  second?: InputMaybe<Scalars["Int"]>;
  year?: InputMaybe<Scalars["Int"]>;
};

/** Generated LocalTime object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jLocalTime = {
  __typename?: "_Neo4jLocalTime";
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) LocalTime value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars["String"]>;
  hour?: Maybe<Scalars["Int"]>;
  microsecond?: Maybe<Scalars["Int"]>;
  millisecond?: Maybe<Scalars["Int"]>;
  minute?: Maybe<Scalars["Int"]>;
  nanosecond?: Maybe<Scalars["Int"]>;
  second?: Maybe<Scalars["Int"]>;
};

/** Generated LocalTime input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jLocalTimeInput = {
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) LocalTime value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/localtime/#functions-localtime-create-string). */
  formatted?: InputMaybe<Scalars["String"]>;
  hour?: InputMaybe<Scalars["Int"]>;
  microsecond?: InputMaybe<Scalars["Int"]>;
  millisecond?: InputMaybe<Scalars["Int"]>;
  minute?: InputMaybe<Scalars["Int"]>;
  nanosecond?: InputMaybe<Scalars["Int"]>;
  second?: InputMaybe<Scalars["Int"]>;
};

/** Generated Point object type for Neo4j [Spatial fields](https://grandstack.io/docs/graphql-spatial-types#using-point-in-queries). */
export type _Neo4jPoint = {
  __typename?: "_Neo4jPoint";
  crs?: Maybe<Scalars["String"]>;
  height?: Maybe<Scalars["Float"]>;
  latitude?: Maybe<Scalars["Float"]>;
  longitude?: Maybe<Scalars["Float"]>;
  srid?: Maybe<Scalars["Int"]>;
  x?: Maybe<Scalars["Float"]>;
  y?: Maybe<Scalars["Float"]>;
  z?: Maybe<Scalars["Float"]>;
};

export type _Neo4jPointDistanceFilter = {
  distance: Scalars["Float"];
  point: _Neo4jPointInput;
};

/** Generated Point input object for Neo4j [Spatial field arguments](https://grandstack.io/docs/graphql-spatial-types/#point-query-arguments). */
export type _Neo4jPointInput = {
  crs?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["Float"]>;
  latitude?: InputMaybe<Scalars["Float"]>;
  longitude?: InputMaybe<Scalars["Float"]>;
  srid?: InputMaybe<Scalars["Int"]>;
  x?: InputMaybe<Scalars["Float"]>;
  y?: InputMaybe<Scalars["Float"]>;
  z?: InputMaybe<Scalars["Float"]>;
};

/** Generated Time object type for Neo4j [Temporal fields](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries). */
export type _Neo4jTime = {
  __typename?: "_Neo4jTime";
  /** Outputs a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime#using-temporal-fields-in-queries) Time value as a String type by using the [toString](https://neo4j.com/docs/cypher-manual/current/functions/string/#functions-tostring) Cypher function. */
  formatted?: Maybe<Scalars["String"]>;
  hour?: Maybe<Scalars["Int"]>;
  microsecond?: Maybe<Scalars["Int"]>;
  millisecond?: Maybe<Scalars["Int"]>;
  minute?: Maybe<Scalars["Int"]>;
  nanosecond?: Maybe<Scalars["Int"]>;
  second?: Maybe<Scalars["Int"]>;
  timezone?: Maybe<Scalars["String"]>;
};

/** Generated Time input object for Neo4j [Temporal field arguments](https://grandstack.io/docs/graphql-temporal-types-datetime/#temporal-query-arguments). */
export type _Neo4jTimeInput = {
  /** Creates a Neo4j [Temporal](https://grandstack.io/docs/graphql-temporal-types-datetime/#using-temporal-fields-in-mutations) Time value using a [String format](https://neo4j.com/docs/cypher-manual/current/functions/temporal/time/#functions-time-create-string). */
  formatted?: InputMaybe<Scalars["String"]>;
  hour?: InputMaybe<Scalars["Int"]>;
  microsecond?: InputMaybe<Scalars["Int"]>;
  millisecond?: InputMaybe<Scalars["Int"]>;
  minute?: InputMaybe<Scalars["Int"]>;
  nanosecond?: InputMaybe<Scalars["Int"]>;
  second?: InputMaybe<Scalars["Int"]>;
  timezone?: InputMaybe<Scalars["String"]>;
};

export enum _RelationDirections {
  In = "IN",
  Out = "OUT",
}

export type ActionQueryVariables = Exact<{
  actionName: Scalars["String"];
}>;

export type ActionQuery = {
  __typename?: "Query";
  action?:
    | {
        __typename?: "Action";
        name: string;
        createdAt: any;
        renderedAction?: any | null | undefined;
        input?:
          | {
              __typename?: "ActionInput";
              parameters?: any | null | undefined;
              typeInstances: Array<{
                __typename?: "InputTypeInstanceDetails";
                id: string;
                name: string;
              }>;
              actionPolicy?:
                | {
                    __typename?: "Policy";
                    rules: Array<{
                      __typename?: "RulesForInterface";
                      interface: {
                        __typename?: "ManifestReferenceWithOptionalRevision";
                        path: any;
                        revision?: any | null | undefined;
                      };
                      oneOf: Array<{
                        __typename?: "PolicyRule";
                        implementationConstraints?:
                          | {
                              __typename?: "PolicyRuleImplementationConstraints";
                              path?: any | null | undefined;
                              requires?:
                                | Array<{
                                    __typename?: "ManifestReferenceWithOptionalRevision";
                                    path: any;
                                    revision?: any | null | undefined;
                                  }>
                                | null
                                | undefined;
                              attributes?:
                                | Array<{
                                    __typename?: "ManifestReferenceWithOptionalRevision";
                                    path: any;
                                    revision?: any | null | undefined;
                                  }>
                                | null
                                | undefined;
                            }
                          | null
                          | undefined;
                        inject?:
                          | {
                              __typename?: "PolicyRuleInjectData";
                              requiredTypeInstances?:
                                | Array<{
                                    __typename?: "RequiredTypeInstanceReference";
                                    id: string;
                                    description?: string | null | undefined;
                                  }>
                                | null
                                | undefined;
                              additionalParameters?:
                                | Array<{
                                    __typename?: "AdditionalParameter";
                                    name: string;
                                    value: any;
                                  }>
                                | null
                                | undefined;
                              additionalTypeInstances?:
                                | Array<{
                                    __typename?: "AdditionalTypeInstanceReference";
                                    name: string;
                                    id: string;
                                  }>
                                | null
                                | undefined;
                            }
                          | null
                          | undefined;
                      }>;
                    }>;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
        output?:
          | {
              __typename?: "ActionOutput";
              typeInstances: Array<{
                __typename?: "OutputTypeInstanceDetails";
                id: string;
                typeRef: {
                  __typename?: "ManifestReference";
                  path: any;
                  revision: any;
                };
              }>;
            }
          | null
          | undefined;
        actionRef: {
          __typename?: "ManifestReference";
          path: any;
          revision: any;
        };
        status?:
          | {
              __typename?: "ActionStatus";
              phase: ActionStatusPhase;
              timestamp: any;
              message?: string | null | undefined;
              runner?:
                | {
                    __typename?: "RunnerStatus";
                    status?: any | null | undefined;
                  }
                | null
                | undefined;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type RunActionMutationVariables = Exact<{
  actionName: Scalars["String"];
}>;

export type RunActionMutation = {
  __typename?: "Mutation";
  runAction: { __typename?: "Action"; name: string };
};

export type ActionFieldsFragment = {
  __typename?: "Action";
  name: string;
  createdAt: any;
  renderedAction?: any | null | undefined;
  input?:
    | {
        __typename?: "ActionInput";
        parameters?: any | null | undefined;
        typeInstances: Array<{
          __typename?: "InputTypeInstanceDetails";
          id: string;
          name: string;
        }>;
        actionPolicy?:
          | {
              __typename?: "Policy";
              rules: Array<{
                __typename?: "RulesForInterface";
                interface: {
                  __typename?: "ManifestReferenceWithOptionalRevision";
                  path: any;
                  revision?: any | null | undefined;
                };
                oneOf: Array<{
                  __typename?: "PolicyRule";
                  implementationConstraints?:
                    | {
                        __typename?: "PolicyRuleImplementationConstraints";
                        path?: any | null | undefined;
                        requires?:
                          | Array<{
                              __typename?: "ManifestReferenceWithOptionalRevision";
                              path: any;
                              revision?: any | null | undefined;
                            }>
                          | null
                          | undefined;
                        attributes?:
                          | Array<{
                              __typename?: "ManifestReferenceWithOptionalRevision";
                              path: any;
                              revision?: any | null | undefined;
                            }>
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                  inject?:
                    | {
                        __typename?: "PolicyRuleInjectData";
                        requiredTypeInstances?:
                          | Array<{
                              __typename?: "RequiredTypeInstanceReference";
                              id: string;
                              description?: string | null | undefined;
                            }>
                          | null
                          | undefined;
                        additionalParameters?:
                          | Array<{
                              __typename?: "AdditionalParameter";
                              name: string;
                              value: any;
                            }>
                          | null
                          | undefined;
                        additionalTypeInstances?:
                          | Array<{
                              __typename?: "AdditionalTypeInstanceReference";
                              name: string;
                              id: string;
                            }>
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                }>;
              }>;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
  output?:
    | {
        __typename?: "ActionOutput";
        typeInstances: Array<{
          __typename?: "OutputTypeInstanceDetails";
          id: string;
          typeRef: {
            __typename?: "ManifestReference";
            path: any;
            revision: any;
          };
        }>;
      }
    | null
    | undefined;
  actionRef: { __typename?: "ManifestReference"; path: any; revision: any };
  status?:
    | {
        __typename?: "ActionStatus";
        phase: ActionStatusPhase;
        timestamp: any;
        message?: string | null | undefined;
        runner?:
          | { __typename?: "RunnerStatus"; status?: any | null | undefined }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type PolicyFieldsFragment = {
  __typename?: "Policy";
  rules: Array<{
    __typename?: "RulesForInterface";
    interface: {
      __typename?: "ManifestReferenceWithOptionalRevision";
      path: any;
      revision?: any | null | undefined;
    };
    oneOf: Array<{
      __typename?: "PolicyRule";
      implementationConstraints?:
        | {
            __typename?: "PolicyRuleImplementationConstraints";
            path?: any | null | undefined;
            requires?:
              | Array<{
                  __typename?: "ManifestReferenceWithOptionalRevision";
                  path: any;
                  revision?: any | null | undefined;
                }>
              | null
              | undefined;
            attributes?:
              | Array<{
                  __typename?: "ManifestReferenceWithOptionalRevision";
                  path: any;
                  revision?: any | null | undefined;
                }>
              | null
              | undefined;
          }
        | null
        | undefined;
      inject?:
        | {
            __typename?: "PolicyRuleInjectData";
            requiredTypeInstances?:
              | Array<{
                  __typename?: "RequiredTypeInstanceReference";
                  id: string;
                  description?: string | null | undefined;
                }>
              | null
              | undefined;
            additionalParameters?:
              | Array<{
                  __typename?: "AdditionalParameter";
                  name: string;
                  value: any;
                }>
              | null
              | undefined;
            additionalTypeInstances?:
              | Array<{
                  __typename?: "AdditionalTypeInstanceReference";
                  name: string;
                  id: string;
                }>
              | null
              | undefined;
          }
        | null
        | undefined;
    }>;
  }>;
};

export type ActionListQueryVariables = Exact<{ [key: string]: never }>;

export type ActionListQuery = {
  __typename?: "Query";
  actions: Array<{
    __typename?: "Action";
    name: string;
    createdAt: any;
    actionRef: { __typename?: "ManifestReference"; path: any; revision: any };
    status?:
      | {
          __typename?: "ActionStatus";
          phase: ActionStatusPhase;
          timestamp: any;
          message?: string | null | undefined;
        }
      | null
      | undefined;
  }>;
};

export type ActionListItemFieldsFragment = {
  __typename?: "Action";
  name: string;
  createdAt: any;
  actionRef: { __typename?: "ManifestReference"; path: any; revision: any };
  status?:
    | {
        __typename?: "ActionStatus";
        phase: ActionStatusPhase;
        timestamp: any;
        message?: string | null | undefined;
      }
    | null
    | undefined;
};

export type TypeInstanceQueryVariables = Exact<{
  typeInstanceID: Scalars["ID"];
}>;

export type TypeInstanceQuery = {
  __typename?: "Query";
  typeInstance?:
    | {
        __typename?: "TypeInstance";
        id: string;
        lockedBy?: any | null | undefined;
        typeRef: {
          __typename?: "TypeInstanceTypeReference";
          path: any;
          revision: any;
        };
        latestResourceVersion?:
          | {
              __typename?: "TypeInstanceResourceVersion";
              resourceVersion: number;
              createdBy?: string | null | undefined;
              metadata: {
                __typename?: "TypeInstanceResourceVersionMetadata";
                attributes?:
                  | Array<{
                      __typename?: "AttributeReference";
                      path: any;
                      revision: any;
                    }>
                  | null
                  | undefined;
              };
              spec: {
                __typename?: "TypeInstanceResourceVersionSpec";
                value: any;
              };
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type TypeInstanceFieldsFragment = {
  __typename?: "TypeInstance";
  id: string;
  lockedBy?: any | null | undefined;
  typeRef: {
    __typename?: "TypeInstanceTypeReference";
    path: any;
    revision: any;
  };
  latestResourceVersion?:
    | {
        __typename?: "TypeInstanceResourceVersion";
        resourceVersion: number;
        createdBy?: string | null | undefined;
        metadata: {
          __typename?: "TypeInstanceResourceVersionMetadata";
          attributes?:
            | Array<{
                __typename?: "AttributeReference";
                path: any;
                revision: any;
              }>
            | null
            | undefined;
        };
        spec: { __typename?: "TypeInstanceResourceVersionSpec"; value: any };
      }
    | null
    | undefined;
};

export type TypeInstanceResourceVersionFieldsFragment = {
  __typename?: "TypeInstanceResourceVersion";
  resourceVersion: number;
  createdBy?: string | null | undefined;
  metadata: {
    __typename?: "TypeInstanceResourceVersionMetadata";
    attributes?:
      | Array<{ __typename?: "AttributeReference"; path: any; revision: any }>
      | null
      | undefined;
  };
  spec: { __typename?: "TypeInstanceResourceVersionSpec"; value: any };
};

export type ListInterfaceGroupsOnlyQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ListInterfaceGroupsOnlyQuery = {
  __typename?: "Query";
  interfaceGroups: Array<{
    __typename?: "InterfaceGroup";
    metadata: {
      __typename?: "GenericMetadata";
      displayName?: string | null | undefined;
      description: string;
      path: any;
      iconURL?: string | null | undefined;
    };
    interfaces: Array<{
      __typename?: "Interface";
      latestRevision?:
        | { __typename?: "InterfaceRevision"; revision: any }
        | null
        | undefined;
    }>;
  }>;
};

export type ListInterfacesFromInterfaceGroupQueryVariables = Exact<{
  path: Scalars["NodePath"];
}>;

export type ListInterfacesFromInterfaceGroupQuery = {
  __typename?: "Query";
  interfaceGroup?:
    | {
        __typename?: "InterfaceGroup";
        interfaces: Array<{
          __typename?: "Interface";
          latestRevision?:
            | {
                __typename?: "InterfaceRevision";
                revision: any;
                metadata: {
                  __typename?: "GenericMetadata";
                  path: any;
                  prefix?: any | null | undefined;
                  name: any;
                  displayName?: string | null | undefined;
                  iconURL?: string | null | undefined;
                  documentationURL?: string | null | undefined;
                  description: string;
                };
                spec: {
                  __typename?: "InterfaceSpec";
                  input: {
                    __typename?: "InterfaceInput";
                    parameters: Array<{
                      __typename?: "InputParameter";
                      name: string;
                      jsonSchema?: any | null | undefined;
                      typeRef?:
                        | {
                            __typename?: "TypeReference";
                            path: any;
                            revision: any;
                          }
                        | null
                        | undefined;
                    }>;
                    typeInstances: Array<
                      | {
                          __typename?: "InputTypeInstance";
                          name: string;
                          typeRef: {
                            __typename?: "TypeReference";
                            path: any;
                            revision: any;
                          };
                        }
                      | null
                      | undefined
                    >;
                  };
                  output: {
                    __typename?: "InterfaceOutput";
                    typeInstances: Array<
                      | { __typename?: "OutputTypeInstance"; name: string }
                      | null
                      | undefined
                    >;
                  };
                };
              }
            | null
            | undefined;
        }>;
      }
    | null
    | undefined;
};

export type GetTypeJsonSchemaQueryVariables = Exact<{
  path: Scalars["NodePath"];
  rev: Scalars["Version"];
}>;

export type GetTypeJsonSchemaQuery = {
  __typename?: "Query";
  type?:
    | {
        __typename?: "Type";
        revision?:
          | {
              __typename?: "TypeRevision";
              spec: {
                __typename?: "TypeSpec";
                jsonSchema?: any | null | undefined;
              };
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type GetInterfaceProvisionParametersQueryVariables = Exact<{
  path: Scalars["NodePath"];
  rev: Scalars["Version"];
}>;

export type GetInterfaceProvisionParametersQuery = {
  __typename?: "Query";
  interface?:
    | {
        __typename?: "Interface";
        revision?:
          | {
              __typename?: "InterfaceRevision";
              spec: {
                __typename?: "InterfaceSpec";
                input: {
                  __typename?: "InterfaceInput";
                  parameters: Array<{
                    __typename?: "InputParameter";
                    name: string;
                    jsonSchema?: any | null | undefined;
                    typeRef?:
                      | {
                          __typename?: "TypeReference";
                          path: any;
                          revision: any;
                        }
                      | null
                      | undefined;
                  }>;
                };
              };
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type ListTypeInstancesQueryVariables = Exact<{
  path: Scalars["NodePath"];
  rev: Scalars["Version"];
}>;

export type ListTypeInstancesQuery = {
  __typename?: "Query";
  typeInstances: Array<{
    __typename?: "TypeInstance";
    id: string;
    lockedBy?: any | null | undefined;
    latestResourceVersion?:
      | {
          __typename?: "TypeInstanceResourceVersion";
          createdBy?: string | null | undefined;
          metadata: {
            __typename?: "TypeInstanceResourceVersionMetadata";
            attributes?:
              | Array<{
                  __typename?: "AttributeReference";
                  path: any;
                  revision: any;
                }>
              | null
              | undefined;
          };
          spec: { __typename?: "TypeInstanceResourceVersionSpec"; value: any };
        }
      | null
      | undefined;
  }>;
};

export type TypeInstanceDataFragment = {
  __typename?: "TypeInstance";
  id: string;
  lockedBy?: any | null | undefined;
  latestResourceVersion?:
    | {
        __typename?: "TypeInstanceResourceVersion";
        createdBy?: string | null | undefined;
        metadata: {
          __typename?: "TypeInstanceResourceVersionMetadata";
          attributes?:
            | Array<{
                __typename?: "AttributeReference";
                path: any;
                revision: any;
              }>
            | null
            | undefined;
        };
        spec: { __typename?: "TypeInstanceResourceVersionSpec"; value: any };
      }
    | null
    | undefined;
};

export type ListImplForInterfaceQueryVariables = Exact<{
  path: Scalars["NodePath"];
  rev: Scalars["Version"];
}>;

export type ListImplForInterfaceQuery = {
  __typename?: "Query";
  interface?:
    | {
        __typename?: "Interface";
        revision?:
          | {
              __typename?: "InterfaceRevision";
              implementationRevisions: Array<{
                __typename?: "ImplementationRevision";
                revision: any;
                metadata: {
                  __typename?: "ImplementationMetadata";
                  path: any;
                  displayName?: string | null | undefined;
                  attributes: Array<{
                    __typename?: "AttributeRevision";
                    metadata: { __typename?: "GenericMetadata"; path: any };
                  }>;
                };
                spec: {
                  __typename?: "ImplementationSpec";
                  additionalInput?:
                    | {
                        __typename?: "ImplementationAdditionalInput";
                        parameters?:
                          | Array<{
                              __typename?: "ImplementationAdditionalInputParameter";
                              name: string;
                              typeRef: {
                                __typename?: "TypeReference";
                                path: any;
                                revision: any;
                              };
                            }>
                          | null
                          | undefined;
                      }
                    | null
                    | undefined;
                };
              }>;
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type ImplementationsMetadataForInterfaceFragment = {
  __typename?: "InterfaceRevision";
  implementationRevisions: Array<{
    __typename?: "ImplementationRevision";
    revision: any;
    metadata: {
      __typename?: "ImplementationMetadata";
      path: any;
      displayName?: string | null | undefined;
      attributes: Array<{
        __typename?: "AttributeRevision";
        metadata: { __typename?: "GenericMetadata"; path: any };
      }>;
    };
    spec: {
      __typename?: "ImplementationSpec";
      additionalInput?:
        | {
            __typename?: "ImplementationAdditionalInput";
            parameters?:
              | Array<{
                  __typename?: "ImplementationAdditionalInputParameter";
                  name: string;
                  typeRef: {
                    __typename?: "TypeReference";
                    path: any;
                    revision: any;
                  };
                }>
              | null
              | undefined;
          }
        | null
        | undefined;
    };
  }>;
};

export type ListInterfaceRevisionQueryVariables = Exact<{
  path: Scalars["NodePath"];
  revision: Scalars["Version"];
}>;

export type ListInterfaceRevisionQuery = {
  __typename?: "Query";
  interface?:
    | {
        __typename?: "Interface";
        revision?:
          | {
              __typename?: "InterfaceRevision";
              revision: any;
              metadata: {
                __typename?: "GenericMetadata";
                path: any;
                displayName?: string | null | undefined;
                iconURL?: string | null | undefined;
                description: string;
              };
              spec: {
                __typename?: "InterfaceSpec";
                input: {
                  __typename?: "InterfaceInput";
                  parameters: Array<{
                    __typename?: "InputParameter";
                    name: string;
                    jsonSchema?: any | null | undefined;
                    typeRef?:
                      | {
                          __typename?: "TypeReference";
                          path: any;
                          revision: any;
                        }
                      | null
                      | undefined;
                  }>;
                  typeInstances: Array<
                    | {
                        __typename?: "InputTypeInstance";
                        name: string;
                        typeRef: {
                          __typename?: "TypeReference";
                          path: any;
                          revision: any;
                        };
                      }
                    | null
                    | undefined
                  >;
                };
              };
            }
          | null
          | undefined;
      }
    | null
    | undefined;
};

export type CreateActionWithInputMutationVariables = Exact<{
  input: ActionDetailsInput;
}>;

export type CreateActionWithInputMutation = {
  __typename?: "Mutation";
  createAction: { __typename?: "Action"; name: string };
};

export const PolicyFieldsFragmentDoc = `
    fragment PolicyFields on Policy {
  rules {
    interface {
      path
      revision
    }
    oneOf {
      implementationConstraints {
        requires {
          path
          revision
        }
        attributes {
          path
          revision
        }
        path
      }
      inject {
        requiredTypeInstances {
          id
          description
        }
        additionalParameters {
          name
          value
        }
        additionalTypeInstances {
          name
          id
        }
      }
    }
  }
}
    `;
export const ActionFieldsFragmentDoc = `
    fragment ActionFields on Action {
  name
  createdAt
  input {
    parameters
    typeInstances {
      id
      name
    }
    actionPolicy {
      ...PolicyFields
    }
  }
  output {
    typeInstances {
      id
      typeRef {
        path
        revision
      }
    }
  }
  actionRef {
    path
    revision
  }
  renderedAction
  status {
    phase
    timestamp
    message
    runner {
      status
    }
  }
}
    ${PolicyFieldsFragmentDoc}`;
export const ActionListItemFieldsFragmentDoc = `
    fragment ActionListItemFields on Action {
  name
  createdAt
  actionRef {
    path
    revision
  }
  status {
    phase
    timestamp
    message
  }
}
    `;
export const TypeInstanceResourceVersionFieldsFragmentDoc = `
    fragment TypeInstanceResourceVersionFields on TypeInstanceResourceVersion {
  resourceVersion
  createdBy
  metadata {
    attributes {
      path
      revision
    }
  }
  spec {
    value
  }
}
    `;
export const TypeInstanceFieldsFragmentDoc = `
    fragment TypeInstanceFields on TypeInstance {
  id
  typeRef {
    path
    revision
  }
  lockedBy
  latestResourceVersion {
    ...TypeInstanceResourceVersionFields
  }
}
    ${TypeInstanceResourceVersionFieldsFragmentDoc}`;
export const TypeInstanceDataFragmentDoc = `
    fragment TypeInstanceData on TypeInstance {
  id
  lockedBy
  latestResourceVersion {
    createdBy
    metadata {
      attributes {
        path
        revision
      }
    }
    spec {
      value
    }
  }
}
    `;
export const ImplementationsMetadataForInterfaceFragmentDoc = `
    fragment ImplementationsMetadataForInterface on InterfaceRevision {
  implementationRevisions {
    revision
    metadata {
      attributes {
        metadata {
          path
        }
      }
      path
      displayName
    }
    spec {
      additionalInput {
        parameters {
          name
          typeRef {
            path
            revision
          }
        }
      }
    }
  }
}
    `;
export const ActionDocument = `
    query Action($actionName: String!) {
  action(name: $actionName) {
    ...ActionFields
  }
}
    ${ActionFieldsFragmentDoc}`;
export const useActionQuery = <TData = ActionQuery, TError = unknown>(
  variables: ActionQueryVariables,
  options?: UseQueryOptions<ActionQuery, TError, TData>
) =>
  useQuery<ActionQuery, TError, TData>(
    ["Action", variables],
    fetcher<ActionQuery, ActionQueryVariables>(ActionDocument, variables),
    options
  );
export const RunActionDocument = `
    mutation RunAction($actionName: String!) {
  runAction(name: $actionName) {
    name
  }
}
    `;
export const useRunActionMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    RunActionMutation,
    TError,
    RunActionMutationVariables,
    TContext
  >
) =>
  useMutation<RunActionMutation, TError, RunActionMutationVariables, TContext>(
    "RunAction",
    (variables?: RunActionMutationVariables) =>
      fetcher<RunActionMutation, RunActionMutationVariables>(
        RunActionDocument,
        variables
      )(),
    options
  );
export const ActionListDocument = `
    query ActionList {
  actions {
    ...ActionListItemFields
  }
}
    ${ActionListItemFieldsFragmentDoc}`;
export const useActionListQuery = <TData = ActionListQuery, TError = unknown>(
  variables?: ActionListQueryVariables,
  options?: UseQueryOptions<ActionListQuery, TError, TData>
) =>
  useQuery<ActionListQuery, TError, TData>(
    variables === undefined ? ["ActionList"] : ["ActionList", variables],
    fetcher<ActionListQuery, ActionListQueryVariables>(
      ActionListDocument,
      variables
    ),
    options
  );
export const TypeInstanceDocument = `
    query TypeInstance($typeInstanceID: ID!) {
  typeInstance(id: $typeInstanceID) {
    ...TypeInstanceFields
  }
}
    ${TypeInstanceFieldsFragmentDoc}`;
export const useTypeInstanceQuery = <
  TData = TypeInstanceQuery,
  TError = unknown
>(
  variables: TypeInstanceQueryVariables,
  options?: UseQueryOptions<TypeInstanceQuery, TError, TData>
) =>
  useQuery<TypeInstanceQuery, TError, TData>(
    ["TypeInstance", variables],
    fetcher<TypeInstanceQuery, TypeInstanceQueryVariables>(
      TypeInstanceDocument,
      variables
    ),
    options
  );
export const ListInterfaceGroupsOnlyDocument = `
    query ListInterfaceGroupsOnly {
  interfaceGroups {
    metadata {
      displayName
      description
      path
      iconURL
    }
    interfaces {
      latestRevision {
        revision
      }
    }
  }
}
    `;
export const useListInterfaceGroupsOnlyQuery = <
  TData = ListInterfaceGroupsOnlyQuery,
  TError = unknown
>(
  variables?: ListInterfaceGroupsOnlyQueryVariables,
  options?: UseQueryOptions<ListInterfaceGroupsOnlyQuery, TError, TData>
) =>
  useQuery<ListInterfaceGroupsOnlyQuery, TError, TData>(
    variables === undefined
      ? ["ListInterfaceGroupsOnly"]
      : ["ListInterfaceGroupsOnly", variables],
    fetcher<
      ListInterfaceGroupsOnlyQuery,
      ListInterfaceGroupsOnlyQueryVariables
    >(ListInterfaceGroupsOnlyDocument, variables),
    options
  );
export const ListInterfacesFromInterfaceGroupDocument = `
    query ListInterfacesFromInterfaceGroup($path: NodePath!) {
  interfaceGroup(path: $path) {
    interfaces {
      latestRevision {
        revision
        metadata {
          path
          prefix
          name
          displayName
          iconURL
          documentationURL
          description
        }
        spec {
          input {
            parameters {
              name
              jsonSchema
              typeRef {
                path
                revision
              }
            }
            typeInstances {
              name
              typeRef {
                path
                revision
              }
            }
          }
          output {
            typeInstances {
              name
            }
          }
        }
      }
    }
  }
}
    `;
export const useListInterfacesFromInterfaceGroupQuery = <
  TData = ListInterfacesFromInterfaceGroupQuery,
  TError = unknown
>(
  variables: ListInterfacesFromInterfaceGroupQueryVariables,
  options?: UseQueryOptions<
    ListInterfacesFromInterfaceGroupQuery,
    TError,
    TData
  >
) =>
  useQuery<ListInterfacesFromInterfaceGroupQuery, TError, TData>(
    ["ListInterfacesFromInterfaceGroup", variables],
    fetcher<
      ListInterfacesFromInterfaceGroupQuery,
      ListInterfacesFromInterfaceGroupQueryVariables
    >(ListInterfacesFromInterfaceGroupDocument, variables),
    options
  );
export const GetTypeJsonSchemaDocument = `
    query GetTypeJSONSchema($path: NodePath!, $rev: Version!) {
  type(path: $path) {
    revision(revision: $rev) {
      spec {
        jsonSchema
      }
    }
  }
}
    `;
export const useGetTypeJsonSchemaQuery = <
  TData = GetTypeJsonSchemaQuery,
  TError = unknown
>(
  variables: GetTypeJsonSchemaQueryVariables,
  options?: UseQueryOptions<GetTypeJsonSchemaQuery, TError, TData>
) =>
  useQuery<GetTypeJsonSchemaQuery, TError, TData>(
    ["GetTypeJSONSchema", variables],
    fetcher<GetTypeJsonSchemaQuery, GetTypeJsonSchemaQueryVariables>(
      GetTypeJsonSchemaDocument,
      variables
    ),
    options
  );
export const GetInterfaceProvisionParametersDocument = `
    query GetInterfaceProvisionParameters($path: NodePath!, $rev: Version!) {
  interface(path: $path) {
    revision(revision: $rev) {
      spec {
        input {
          parameters {
            name
            jsonSchema
            typeRef {
              path
              revision
            }
          }
        }
      }
    }
  }
}
    `;
export const useGetInterfaceProvisionParametersQuery = <
  TData = GetInterfaceProvisionParametersQuery,
  TError = unknown
>(
  variables: GetInterfaceProvisionParametersQueryVariables,
  options?: UseQueryOptions<GetInterfaceProvisionParametersQuery, TError, TData>
) =>
  useQuery<GetInterfaceProvisionParametersQuery, TError, TData>(
    ["GetInterfaceProvisionParameters", variables],
    fetcher<
      GetInterfaceProvisionParametersQuery,
      GetInterfaceProvisionParametersQueryVariables
    >(GetInterfaceProvisionParametersDocument, variables),
    options
  );
export const ListTypeInstancesDocument = `
    query ListTypeInstances($path: NodePath!, $rev: Version!) {
  typeInstances(filter: {typeRef: {path: $path, revision: $rev}}) {
    ...TypeInstanceData
  }
}
    ${TypeInstanceDataFragmentDoc}`;
export const useListTypeInstancesQuery = <
  TData = ListTypeInstancesQuery,
  TError = unknown
>(
  variables: ListTypeInstancesQueryVariables,
  options?: UseQueryOptions<ListTypeInstancesQuery, TError, TData>
) =>
  useQuery<ListTypeInstancesQuery, TError, TData>(
    ["ListTypeInstances", variables],
    fetcher<ListTypeInstancesQuery, ListTypeInstancesQueryVariables>(
      ListTypeInstancesDocument,
      variables
    ),
    options
  );
export const ListImplForInterfaceDocument = `
    query ListImplForInterface($path: NodePath!, $rev: Version!) {
  interface(path: $path) {
    revision(revision: $rev) {
      ...ImplementationsMetadataForInterface
    }
  }
}
    ${ImplementationsMetadataForInterfaceFragmentDoc}`;
export const useListImplForInterfaceQuery = <
  TData = ListImplForInterfaceQuery,
  TError = unknown
>(
  variables: ListImplForInterfaceQueryVariables,
  options?: UseQueryOptions<ListImplForInterfaceQuery, TError, TData>
) =>
  useQuery<ListImplForInterfaceQuery, TError, TData>(
    ["ListImplForInterface", variables],
    fetcher<ListImplForInterfaceQuery, ListImplForInterfaceQueryVariables>(
      ListImplForInterfaceDocument,
      variables
    ),
    options
  );
export const ListInterfaceRevisionDocument = `
    query ListInterfaceRevision($path: NodePath!, $revision: Version!) {
  interface(path: $path) {
    revision(revision: $revision) {
      revision
      metadata {
        path
        displayName
        iconURL
        description
      }
      spec {
        input {
          parameters {
            name
            jsonSchema
            typeRef {
              path
              revision
            }
          }
          typeInstances {
            name
            typeRef {
              path
              revision
            }
          }
        }
      }
    }
  }
}
    `;
export const useListInterfaceRevisionQuery = <
  TData = ListInterfaceRevisionQuery,
  TError = unknown
>(
  variables: ListInterfaceRevisionQueryVariables,
  options?: UseQueryOptions<ListInterfaceRevisionQuery, TError, TData>
) =>
  useQuery<ListInterfaceRevisionQuery, TError, TData>(
    ["ListInterfaceRevision", variables],
    fetcher<ListInterfaceRevisionQuery, ListInterfaceRevisionQueryVariables>(
      ListInterfaceRevisionDocument,
      variables
    ),
    options
  );
export const CreateActionWithInputDocument = `
    mutation CreateActionWithInput($input: ActionDetailsInput!) {
  createAction(in: $input) {
    name
  }
}
    `;
export const useCreateActionWithInputMutation = <
  TError = unknown,
  TContext = unknown
>(
  options?: UseMutationOptions<
    CreateActionWithInputMutation,
    TError,
    CreateActionWithInputMutationVariables,
    TContext
  >
) =>
  useMutation<
    CreateActionWithInputMutation,
    TError,
    CreateActionWithInputMutationVariables,
    TContext
  >(
    "CreateActionWithInput",
    (variables?: CreateActionWithInputMutationVariables) =>
      fetcher<
        CreateActionWithInputMutation,
        CreateActionWithInputMutationVariables
      >(CreateActionWithInputDocument, variables)(),
    options
  );
