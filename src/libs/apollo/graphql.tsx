import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "brands" */
export type Brands = {
  __typename?: 'brands';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** aggregated selection of "brands" */
export type Brands_Aggregate = {
  __typename?: 'brands_aggregate';
  aggregate?: Maybe<Brands_Aggregate_Fields>;
  nodes: Array<Brands>;
};

/** aggregate fields of "brands" */
export type Brands_Aggregate_Fields = {
  __typename?: 'brands_aggregate_fields';
  avg?: Maybe<Brands_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Brands_Max_Fields>;
  min?: Maybe<Brands_Min_Fields>;
  stddev?: Maybe<Brands_Stddev_Fields>;
  stddev_pop?: Maybe<Brands_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Brands_Stddev_Samp_Fields>;
  sum?: Maybe<Brands_Sum_Fields>;
  var_pop?: Maybe<Brands_Var_Pop_Fields>;
  var_samp?: Maybe<Brands_Var_Samp_Fields>;
  variance?: Maybe<Brands_Variance_Fields>;
};


/** aggregate fields of "brands" */
export type Brands_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Brands_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Brands_Avg_Fields = {
  __typename?: 'brands_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "brands". All fields are combined with a logical 'AND'. */
export type Brands_Bool_Exp = {
  _and?: InputMaybe<Array<Brands_Bool_Exp>>;
  _not?: InputMaybe<Brands_Bool_Exp>;
  _or?: InputMaybe<Array<Brands_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "brands" */
export enum Brands_Constraint {
  /** unique or primary key constraint */
  BrandsPkey = 'brands_pkey'
}

/** input type for incrementing numeric columns in table "brands" */
export type Brands_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "brands" */
export type Brands_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Brands_Max_Fields = {
  __typename?: 'brands_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Brands_Min_Fields = {
  __typename?: 'brands_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "brands" */
export type Brands_Mutation_Response = {
  __typename?: 'brands_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Brands>;
};

/** input type for inserting object relation for remote table "brands" */
export type Brands_Obj_Rel_Insert_Input = {
  data: Brands_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Brands_On_Conflict>;
};

/** on_conflict condition type for table "brands" */
export type Brands_On_Conflict = {
  constraint: Brands_Constraint;
  update_columns?: Array<Brands_Update_Column>;
  where?: InputMaybe<Brands_Bool_Exp>;
};

/** Ordering options when selecting data from "brands". */
export type Brands_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: brands */
export type Brands_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "brands" */
export enum Brands_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "brands" */
export type Brands_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Brands_Stddev_Fields = {
  __typename?: 'brands_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Brands_Stddev_Pop_Fields = {
  __typename?: 'brands_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Brands_Stddev_Samp_Fields = {
  __typename?: 'brands_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Brands_Sum_Fields = {
  __typename?: 'brands_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "brands" */
export enum Brands_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Brands_Var_Pop_Fields = {
  __typename?: 'brands_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Brands_Var_Samp_Fields = {
  __typename?: 'brands_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Brands_Variance_Fields = {
  __typename?: 'brands_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "categories" */
export type Categories = {
  __typename?: 'categories';
  id: Scalars['Int'];
  name: Scalars['String'];
  /** An object relationship */
  sub_category?: Maybe<Sub_Categories>;
  sub_category_id: Scalars['Int'];
};

/** aggregated selection of "categories" */
export type Categories_Aggregate = {
  __typename?: 'categories_aggregate';
  aggregate?: Maybe<Categories_Aggregate_Fields>;
  nodes: Array<Categories>;
};

/** aggregate fields of "categories" */
export type Categories_Aggregate_Fields = {
  __typename?: 'categories_aggregate_fields';
  avg?: Maybe<Categories_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Categories_Max_Fields>;
  min?: Maybe<Categories_Min_Fields>;
  stddev?: Maybe<Categories_Stddev_Fields>;
  stddev_pop?: Maybe<Categories_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Categories_Stddev_Samp_Fields>;
  sum?: Maybe<Categories_Sum_Fields>;
  var_pop?: Maybe<Categories_Var_Pop_Fields>;
  var_samp?: Maybe<Categories_Var_Samp_Fields>;
  variance?: Maybe<Categories_Variance_Fields>;
};


/** aggregate fields of "categories" */
export type Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Categories_Avg_Fields = {
  __typename?: 'categories_avg_fields';
  id?: Maybe<Scalars['Float']>;
  sub_category_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "categories". All fields are combined with a logical 'AND'. */
export type Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Categories_Bool_Exp>>;
  _not?: InputMaybe<Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Categories_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  sub_category?: InputMaybe<Sub_Categories_Bool_Exp>;
  sub_category_id?: InputMaybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "categories" */
export enum Categories_Constraint {
  /** unique or primary key constraint */
  CategoriesPkey = 'categories_pkey'
}

/** input type for incrementing numeric columns in table "categories" */
export type Categories_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
  sub_category_id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "categories" */
export type Categories_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  sub_category?: InputMaybe<Sub_Categories_Obj_Rel_Insert_Input>;
  sub_category_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Categories_Max_Fields = {
  __typename?: 'categories_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sub_category_id?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Categories_Min_Fields = {
  __typename?: 'categories_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  sub_category_id?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "categories" */
export type Categories_Mutation_Response = {
  __typename?: 'categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Categories>;
};

/** input type for inserting object relation for remote table "categories" */
export type Categories_Obj_Rel_Insert_Input = {
  data: Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};

/** on_conflict condition type for table "categories" */
export type Categories_On_Conflict = {
  constraint: Categories_Constraint;
  update_columns?: Array<Categories_Update_Column>;
  where?: InputMaybe<Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "categories". */
export type Categories_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  sub_category?: InputMaybe<Sub_Categories_Order_By>;
  sub_category_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: categories */
export type Categories_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "categories" */
export enum Categories_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SubCategoryId = 'sub_category_id'
}

/** input type for updating data in table "categories" */
export type Categories_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  sub_category_id?: InputMaybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Categories_Stddev_Fields = {
  __typename?: 'categories_stddev_fields';
  id?: Maybe<Scalars['Float']>;
  sub_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Categories_Stddev_Pop_Fields = {
  __typename?: 'categories_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
  sub_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Categories_Stddev_Samp_Fields = {
  __typename?: 'categories_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
  sub_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Categories_Sum_Fields = {
  __typename?: 'categories_sum_fields';
  id?: Maybe<Scalars['Int']>;
  sub_category_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "categories" */
export enum Categories_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  SubCategoryId = 'sub_category_id'
}

/** aggregate var_pop on columns */
export type Categories_Var_Pop_Fields = {
  __typename?: 'categories_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
  sub_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Categories_Var_Samp_Fields = {
  __typename?: 'categories_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
  sub_category_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Categories_Variance_Fields = {
  __typename?: 'categories_variance_fields';
  id?: Maybe<Scalars['Float']>;
  sub_category_id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "images" */
export type Images = {
  __typename?: 'images';
  id: Scalars['Int'];
  strage_id?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

/** aggregated selection of "images" */
export type Images_Aggregate = {
  __typename?: 'images_aggregate';
  aggregate?: Maybe<Images_Aggregate_Fields>;
  nodes: Array<Images>;
};

/** aggregate fields of "images" */
export type Images_Aggregate_Fields = {
  __typename?: 'images_aggregate_fields';
  avg?: Maybe<Images_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Images_Max_Fields>;
  min?: Maybe<Images_Min_Fields>;
  stddev?: Maybe<Images_Stddev_Fields>;
  stddev_pop?: Maybe<Images_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Images_Stddev_Samp_Fields>;
  sum?: Maybe<Images_Sum_Fields>;
  var_pop?: Maybe<Images_Var_Pop_Fields>;
  var_samp?: Maybe<Images_Var_Samp_Fields>;
  variance?: Maybe<Images_Variance_Fields>;
};


/** aggregate fields of "images" */
export type Images_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Images_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Images_Avg_Fields = {
  __typename?: 'images_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "images". All fields are combined with a logical 'AND'. */
export type Images_Bool_Exp = {
  _and?: InputMaybe<Array<Images_Bool_Exp>>;
  _not?: InputMaybe<Images_Bool_Exp>;
  _or?: InputMaybe<Array<Images_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  strage_id?: InputMaybe<String_Comparison_Exp>;
  url?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "images" */
export enum Images_Constraint {
  /** unique or primary key constraint */
  ImagesPkey = 'images_pkey'
}

/** input type for incrementing numeric columns in table "images" */
export type Images_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "images" */
export type Images_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  strage_id?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Images_Max_Fields = {
  __typename?: 'images_max_fields';
  id?: Maybe<Scalars['Int']>;
  strage_id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Images_Min_Fields = {
  __typename?: 'images_min_fields';
  id?: Maybe<Scalars['Int']>;
  strage_id?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "images" */
export type Images_Mutation_Response = {
  __typename?: 'images_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Images>;
};

/** on_conflict condition type for table "images" */
export type Images_On_Conflict = {
  constraint: Images_Constraint;
  update_columns?: Array<Images_Update_Column>;
  where?: InputMaybe<Images_Bool_Exp>;
};

/** Ordering options when selecting data from "images". */
export type Images_Order_By = {
  id?: InputMaybe<Order_By>;
  strage_id?: InputMaybe<Order_By>;
  url?: InputMaybe<Order_By>;
};

/** primary key columns input for table: images */
export type Images_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "images" */
export enum Images_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  StrageId = 'strage_id',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "images" */
export type Images_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  strage_id?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Images_Stddev_Fields = {
  __typename?: 'images_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Images_Stddev_Pop_Fields = {
  __typename?: 'images_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Images_Stddev_Samp_Fields = {
  __typename?: 'images_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Images_Sum_Fields = {
  __typename?: 'images_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "images" */
export enum Images_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  StrageId = 'strage_id',
  /** column name */
  Url = 'url'
}

/** aggregate var_pop on columns */
export type Images_Var_Pop_Fields = {
  __typename?: 'images_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Images_Var_Samp_Fields = {
  __typename?: 'images_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Images_Variance_Fields = {
  __typename?: 'images_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "items" */
export type Items = {
  __typename?: 'items';
  /** An object relationship */
  brand?: Maybe<Brands>;
  brand_id?: Maybe<Scalars['Int']>;
  can_sale: Scalars['Boolean'];
  /** An object relationship */
  category?: Maybe<Categories>;
  category_id?: Maybe<Scalars['Int']>;
  created_at: Scalars['timestamptz'];
  current_count: Scalars['Int'];
  current_price?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  gender: Scalars['Int'];
  id: Scalars['Int'];
  image_id?: Maybe<Scalars['Int']>;
  is_rental_available: Scalars['Boolean'];
  name: Scalars['String'];
  next_lending_date?: Maybe<Scalars['timestamptz']>;
  regular_price?: Maybe<Scalars['Int']>;
  updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "items" */
export type Items_Aggregate = {
  __typename?: 'items_aggregate';
  aggregate?: Maybe<Items_Aggregate_Fields>;
  nodes: Array<Items>;
};

/** aggregate fields of "items" */
export type Items_Aggregate_Fields = {
  __typename?: 'items_aggregate_fields';
  avg?: Maybe<Items_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Items_Max_Fields>;
  min?: Maybe<Items_Min_Fields>;
  stddev?: Maybe<Items_Stddev_Fields>;
  stddev_pop?: Maybe<Items_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Items_Stddev_Samp_Fields>;
  sum?: Maybe<Items_Sum_Fields>;
  var_pop?: Maybe<Items_Var_Pop_Fields>;
  var_samp?: Maybe<Items_Var_Samp_Fields>;
  variance?: Maybe<Items_Variance_Fields>;
};


/** aggregate fields of "items" */
export type Items_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Items_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Items_Avg_Fields = {
  __typename?: 'items_avg_fields';
  brand_id?: Maybe<Scalars['Float']>;
  category_id?: Maybe<Scalars['Float']>;
  current_count?: Maybe<Scalars['Float']>;
  current_price?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  regular_price?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "items". All fields are combined with a logical 'AND'. */
export type Items_Bool_Exp = {
  _and?: InputMaybe<Array<Items_Bool_Exp>>;
  _not?: InputMaybe<Items_Bool_Exp>;
  _or?: InputMaybe<Array<Items_Bool_Exp>>;
  brand?: InputMaybe<Brands_Bool_Exp>;
  brand_id?: InputMaybe<Int_Comparison_Exp>;
  can_sale?: InputMaybe<Boolean_Comparison_Exp>;
  category?: InputMaybe<Categories_Bool_Exp>;
  category_id?: InputMaybe<Int_Comparison_Exp>;
  created_at?: InputMaybe<Timestamptz_Comparison_Exp>;
  current_count?: InputMaybe<Int_Comparison_Exp>;
  current_price?: InputMaybe<Int_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  gender?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  image_id?: InputMaybe<Int_Comparison_Exp>;
  is_rental_available?: InputMaybe<Boolean_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  next_lending_date?: InputMaybe<Timestamptz_Comparison_Exp>;
  regular_price?: InputMaybe<Int_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "items" */
export enum Items_Constraint {
  /** unique or primary key constraint */
  ItemsPkey = 'items_pkey'
}

/** input type for incrementing numeric columns in table "items" */
export type Items_Inc_Input = {
  brand_id?: InputMaybe<Scalars['Int']>;
  category_id?: InputMaybe<Scalars['Int']>;
  current_count?: InputMaybe<Scalars['Int']>;
  current_price?: InputMaybe<Scalars['Int']>;
  gender?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  image_id?: InputMaybe<Scalars['Int']>;
  regular_price?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "items" */
export type Items_Insert_Input = {
  brand?: InputMaybe<Brands_Obj_Rel_Insert_Input>;
  brand_id?: InputMaybe<Scalars['Int']>;
  can_sale?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<Categories_Obj_Rel_Insert_Input>;
  category_id?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_count?: InputMaybe<Scalars['Int']>;
  current_price?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  image_id?: InputMaybe<Scalars['Int']>;
  is_rental_available?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  next_lending_date?: InputMaybe<Scalars['timestamptz']>;
  regular_price?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Items_Max_Fields = {
  __typename?: 'items_max_fields';
  brand_id?: Maybe<Scalars['Int']>;
  category_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_count?: Maybe<Scalars['Int']>;
  current_price?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  image_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  next_lending_date?: Maybe<Scalars['timestamptz']>;
  regular_price?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Items_Min_Fields = {
  __typename?: 'items_min_fields';
  brand_id?: Maybe<Scalars['Int']>;
  category_id?: Maybe<Scalars['Int']>;
  created_at?: Maybe<Scalars['timestamptz']>;
  current_count?: Maybe<Scalars['Int']>;
  current_price?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  image_id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  next_lending_date?: Maybe<Scalars['timestamptz']>;
  regular_price?: Maybe<Scalars['Int']>;
  updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "items" */
export type Items_Mutation_Response = {
  __typename?: 'items_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Items>;
};

/** on_conflict condition type for table "items" */
export type Items_On_Conflict = {
  constraint: Items_Constraint;
  update_columns?: Array<Items_Update_Column>;
  where?: InputMaybe<Items_Bool_Exp>;
};

/** Ordering options when selecting data from "items". */
export type Items_Order_By = {
  brand?: InputMaybe<Brands_Order_By>;
  brand_id?: InputMaybe<Order_By>;
  can_sale?: InputMaybe<Order_By>;
  category?: InputMaybe<Categories_Order_By>;
  category_id?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  current_count?: InputMaybe<Order_By>;
  current_price?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  gender?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  image_id?: InputMaybe<Order_By>;
  is_rental_available?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  next_lending_date?: InputMaybe<Order_By>;
  regular_price?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: items */
export type Items_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "items" */
export enum Items_Select_Column {
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CanSale = 'can_sale',
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentCount = 'current_count',
  /** column name */
  CurrentPrice = 'current_price',
  /** column name */
  Description = 'description',
  /** column name */
  Gender = 'gender',
  /** column name */
  Id = 'id',
  /** column name */
  ImageId = 'image_id',
  /** column name */
  IsRentalAvailable = 'is_rental_available',
  /** column name */
  Name = 'name',
  /** column name */
  NextLendingDate = 'next_lending_date',
  /** column name */
  RegularPrice = 'regular_price',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "items" */
export type Items_Set_Input = {
  brand_id?: InputMaybe<Scalars['Int']>;
  can_sale?: InputMaybe<Scalars['Boolean']>;
  category_id?: InputMaybe<Scalars['Int']>;
  created_at?: InputMaybe<Scalars['timestamptz']>;
  current_count?: InputMaybe<Scalars['Int']>;
  current_price?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  image_id?: InputMaybe<Scalars['Int']>;
  is_rental_available?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  next_lending_date?: InputMaybe<Scalars['timestamptz']>;
  regular_price?: InputMaybe<Scalars['Int']>;
  updated_at?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Items_Stddev_Fields = {
  __typename?: 'items_stddev_fields';
  brand_id?: Maybe<Scalars['Float']>;
  category_id?: Maybe<Scalars['Float']>;
  current_count?: Maybe<Scalars['Float']>;
  current_price?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  regular_price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Items_Stddev_Pop_Fields = {
  __typename?: 'items_stddev_pop_fields';
  brand_id?: Maybe<Scalars['Float']>;
  category_id?: Maybe<Scalars['Float']>;
  current_count?: Maybe<Scalars['Float']>;
  current_price?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  regular_price?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Items_Stddev_Samp_Fields = {
  __typename?: 'items_stddev_samp_fields';
  brand_id?: Maybe<Scalars['Float']>;
  category_id?: Maybe<Scalars['Float']>;
  current_count?: Maybe<Scalars['Float']>;
  current_price?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  regular_price?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Items_Sum_Fields = {
  __typename?: 'items_sum_fields';
  brand_id?: Maybe<Scalars['Int']>;
  category_id?: Maybe<Scalars['Int']>;
  current_count?: Maybe<Scalars['Int']>;
  current_price?: Maybe<Scalars['Int']>;
  gender?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  image_id?: Maybe<Scalars['Int']>;
  regular_price?: Maybe<Scalars['Int']>;
};

/** update columns of table "items" */
export enum Items_Update_Column {
  /** column name */
  BrandId = 'brand_id',
  /** column name */
  CanSale = 'can_sale',
  /** column name */
  CategoryId = 'category_id',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  CurrentCount = 'current_count',
  /** column name */
  CurrentPrice = 'current_price',
  /** column name */
  Description = 'description',
  /** column name */
  Gender = 'gender',
  /** column name */
  Id = 'id',
  /** column name */
  ImageId = 'image_id',
  /** column name */
  IsRentalAvailable = 'is_rental_available',
  /** column name */
  Name = 'name',
  /** column name */
  NextLendingDate = 'next_lending_date',
  /** column name */
  RegularPrice = 'regular_price',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Items_Var_Pop_Fields = {
  __typename?: 'items_var_pop_fields';
  brand_id?: Maybe<Scalars['Float']>;
  category_id?: Maybe<Scalars['Float']>;
  current_count?: Maybe<Scalars['Float']>;
  current_price?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  regular_price?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Items_Var_Samp_Fields = {
  __typename?: 'items_var_samp_fields';
  brand_id?: Maybe<Scalars['Float']>;
  category_id?: Maybe<Scalars['Float']>;
  current_count?: Maybe<Scalars['Float']>;
  current_price?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  regular_price?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Items_Variance_Fields = {
  __typename?: 'items_variance_fields';
  brand_id?: Maybe<Scalars['Float']>;
  category_id?: Maybe<Scalars['Float']>;
  current_count?: Maybe<Scalars['Float']>;
  current_price?: Maybe<Scalars['Float']>;
  gender?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  image_id?: Maybe<Scalars['Float']>;
  regular_price?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "brands" */
  delete_brands?: Maybe<Brands_Mutation_Response>;
  /** delete single row from the table: "brands" */
  delete_brands_by_pk?: Maybe<Brands>;
  /** delete data from the table: "categories" */
  delete_categories?: Maybe<Categories_Mutation_Response>;
  /** delete single row from the table: "categories" */
  delete_categories_by_pk?: Maybe<Categories>;
  /** delete data from the table: "images" */
  delete_images?: Maybe<Images_Mutation_Response>;
  /** delete single row from the table: "images" */
  delete_images_by_pk?: Maybe<Images>;
  /** delete data from the table: "items" */
  delete_items?: Maybe<Items_Mutation_Response>;
  /** delete single row from the table: "items" */
  delete_items_by_pk?: Maybe<Items>;
  /** delete data from the table: "sub_categories" */
  delete_sub_categories?: Maybe<Sub_Categories_Mutation_Response>;
  /** delete single row from the table: "sub_categories" */
  delete_sub_categories_by_pk?: Maybe<Sub_Categories>;
  /** insert data into the table: "brands" */
  insert_brands?: Maybe<Brands_Mutation_Response>;
  /** insert a single row into the table: "brands" */
  insert_brands_one?: Maybe<Brands>;
  /** insert data into the table: "categories" */
  insert_categories?: Maybe<Categories_Mutation_Response>;
  /** insert a single row into the table: "categories" */
  insert_categories_one?: Maybe<Categories>;
  /** insert data into the table: "images" */
  insert_images?: Maybe<Images_Mutation_Response>;
  /** insert a single row into the table: "images" */
  insert_images_one?: Maybe<Images>;
  /** insert data into the table: "items" */
  insert_items?: Maybe<Items_Mutation_Response>;
  /** insert a single row into the table: "items" */
  insert_items_one?: Maybe<Items>;
  /** insert data into the table: "sub_categories" */
  insert_sub_categories?: Maybe<Sub_Categories_Mutation_Response>;
  /** insert a single row into the table: "sub_categories" */
  insert_sub_categories_one?: Maybe<Sub_Categories>;
  /** update data of the table: "brands" */
  update_brands?: Maybe<Brands_Mutation_Response>;
  /** update single row of the table: "brands" */
  update_brands_by_pk?: Maybe<Brands>;
  /** update data of the table: "categories" */
  update_categories?: Maybe<Categories_Mutation_Response>;
  /** update single row of the table: "categories" */
  update_categories_by_pk?: Maybe<Categories>;
  /** update data of the table: "images" */
  update_images?: Maybe<Images_Mutation_Response>;
  /** update single row of the table: "images" */
  update_images_by_pk?: Maybe<Images>;
  /** update data of the table: "items" */
  update_items?: Maybe<Items_Mutation_Response>;
  /** update single row of the table: "items" */
  update_items_by_pk?: Maybe<Items>;
  /** update data of the table: "sub_categories" */
  update_sub_categories?: Maybe<Sub_Categories_Mutation_Response>;
  /** update single row of the table: "sub_categories" */
  update_sub_categories_by_pk?: Maybe<Sub_Categories>;
};


/** mutation root */
export type Mutation_RootDelete_BrandsArgs = {
  where: Brands_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Brands_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_CategoriesArgs = {
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Categories_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ImagesArgs = {
  where: Images_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Images_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ItemsArgs = {
  where: Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Items_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Sub_CategoriesArgs = {
  where: Sub_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sub_Categories_By_PkArgs = {
  id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_BrandsArgs = {
  objects: Array<Brands_Insert_Input>;
  on_conflict?: InputMaybe<Brands_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Brands_OneArgs = {
  object: Brands_Insert_Input;
  on_conflict?: InputMaybe<Brands_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CategoriesArgs = {
  objects: Array<Categories_Insert_Input>;
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Categories_OneArgs = {
  object: Categories_Insert_Input;
  on_conflict?: InputMaybe<Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ImagesArgs = {
  objects: Array<Images_Insert_Input>;
  on_conflict?: InputMaybe<Images_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Images_OneArgs = {
  object: Images_Insert_Input;
  on_conflict?: InputMaybe<Images_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ItemsArgs = {
  objects: Array<Items_Insert_Input>;
  on_conflict?: InputMaybe<Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Items_OneArgs = {
  object: Items_Insert_Input;
  on_conflict?: InputMaybe<Items_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sub_CategoriesArgs = {
  objects: Array<Sub_Categories_Insert_Input>;
  on_conflict?: InputMaybe<Sub_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sub_Categories_OneArgs = {
  object: Sub_Categories_Insert_Input;
  on_conflict?: InputMaybe<Sub_Categories_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_BrandsArgs = {
  _inc?: InputMaybe<Brands_Inc_Input>;
  _set?: InputMaybe<Brands_Set_Input>;
  where: Brands_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Brands_By_PkArgs = {
  _inc?: InputMaybe<Brands_Inc_Input>;
  _set?: InputMaybe<Brands_Set_Input>;
  pk_columns: Brands_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CategoriesArgs = {
  _inc?: InputMaybe<Categories_Inc_Input>;
  _set?: InputMaybe<Categories_Set_Input>;
  where: Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Categories_By_PkArgs = {
  _inc?: InputMaybe<Categories_Inc_Input>;
  _set?: InputMaybe<Categories_Set_Input>;
  pk_columns: Categories_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ImagesArgs = {
  _inc?: InputMaybe<Images_Inc_Input>;
  _set?: InputMaybe<Images_Set_Input>;
  where: Images_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Images_By_PkArgs = {
  _inc?: InputMaybe<Images_Inc_Input>;
  _set?: InputMaybe<Images_Set_Input>;
  pk_columns: Images_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ItemsArgs = {
  _inc?: InputMaybe<Items_Inc_Input>;
  _set?: InputMaybe<Items_Set_Input>;
  where: Items_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Items_By_PkArgs = {
  _inc?: InputMaybe<Items_Inc_Input>;
  _set?: InputMaybe<Items_Set_Input>;
  pk_columns: Items_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Sub_CategoriesArgs = {
  _inc?: InputMaybe<Sub_Categories_Inc_Input>;
  _set?: InputMaybe<Sub_Categories_Set_Input>;
  where: Sub_Categories_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sub_Categories_By_PkArgs = {
  _inc?: InputMaybe<Sub_Categories_Inc_Input>;
  _set?: InputMaybe<Sub_Categories_Set_Input>;
  pk_columns: Sub_Categories_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "brands" */
  brands: Array<Brands>;
  /** fetch aggregated fields from the table: "brands" */
  brands_aggregate: Brands_Aggregate;
  /** fetch data from the table: "brands" using primary key columns */
  brands_by_pk?: Maybe<Brands>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "images" */
  images: Array<Images>;
  /** fetch aggregated fields from the table: "images" */
  images_aggregate: Images_Aggregate;
  /** fetch data from the table: "images" using primary key columns */
  images_by_pk?: Maybe<Images>;
  /** fetch data from the table: "items" */
  items: Array<Items>;
  /** fetch aggregated fields from the table: "items" */
  items_aggregate: Items_Aggregate;
  /** fetch data from the table: "items" using primary key columns */
  items_by_pk?: Maybe<Items>;
  /** fetch data from the table: "sub_categories" */
  sub_categories: Array<Sub_Categories>;
  /** fetch aggregated fields from the table: "sub_categories" */
  sub_categories_aggregate: Sub_Categories_Aggregate;
  /** fetch data from the table: "sub_categories" using primary key columns */
  sub_categories_by_pk?: Maybe<Sub_Categories>;
};


export type Query_RootBrandsArgs = {
  distinct_on?: InputMaybe<Array<Brands_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brands_Order_By>>;
  where?: InputMaybe<Brands_Bool_Exp>;
};


export type Query_RootBrands_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Brands_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brands_Order_By>>;
  where?: InputMaybe<Brands_Bool_Exp>;
};


export type Query_RootBrands_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Query_RootCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Query_RootCategories_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootImagesArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Query_RootImages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Query_RootImages_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootItemsArgs = {
  distinct_on?: InputMaybe<Array<Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Items_Order_By>>;
  where?: InputMaybe<Items_Bool_Exp>;
};


export type Query_RootItems_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Items_Order_By>>;
  where?: InputMaybe<Items_Bool_Exp>;
};


export type Query_RootItems_By_PkArgs = {
  id: Scalars['Int'];
};


export type Query_RootSub_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Sub_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sub_Categories_Order_By>>;
  where?: InputMaybe<Sub_Categories_Bool_Exp>;
};


export type Query_RootSub_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sub_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sub_Categories_Order_By>>;
  where?: InputMaybe<Sub_Categories_Bool_Exp>;
};


export type Query_RootSub_Categories_By_PkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "sub_categories" */
export type Sub_Categories = {
  __typename?: 'sub_categories';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/** aggregated selection of "sub_categories" */
export type Sub_Categories_Aggregate = {
  __typename?: 'sub_categories_aggregate';
  aggregate?: Maybe<Sub_Categories_Aggregate_Fields>;
  nodes: Array<Sub_Categories>;
};

/** aggregate fields of "sub_categories" */
export type Sub_Categories_Aggregate_Fields = {
  __typename?: 'sub_categories_aggregate_fields';
  avg?: Maybe<Sub_Categories_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Sub_Categories_Max_Fields>;
  min?: Maybe<Sub_Categories_Min_Fields>;
  stddev?: Maybe<Sub_Categories_Stddev_Fields>;
  stddev_pop?: Maybe<Sub_Categories_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Sub_Categories_Stddev_Samp_Fields>;
  sum?: Maybe<Sub_Categories_Sum_Fields>;
  var_pop?: Maybe<Sub_Categories_Var_Pop_Fields>;
  var_samp?: Maybe<Sub_Categories_Var_Samp_Fields>;
  variance?: Maybe<Sub_Categories_Variance_Fields>;
};


/** aggregate fields of "sub_categories" */
export type Sub_Categories_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Sub_Categories_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Sub_Categories_Avg_Fields = {
  __typename?: 'sub_categories_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "sub_categories". All fields are combined with a logical 'AND'. */
export type Sub_Categories_Bool_Exp = {
  _and?: InputMaybe<Array<Sub_Categories_Bool_Exp>>;
  _not?: InputMaybe<Sub_Categories_Bool_Exp>;
  _or?: InputMaybe<Array<Sub_Categories_Bool_Exp>>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "sub_categories" */
export enum Sub_Categories_Constraint {
  /** unique or primary key constraint */
  SubCategoriesPkey = 'sub_categories_pkey'
}

/** input type for incrementing numeric columns in table "sub_categories" */
export type Sub_Categories_Inc_Input = {
  id?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "sub_categories" */
export type Sub_Categories_Insert_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Sub_Categories_Max_Fields = {
  __typename?: 'sub_categories_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Sub_Categories_Min_Fields = {
  __typename?: 'sub_categories_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "sub_categories" */
export type Sub_Categories_Mutation_Response = {
  __typename?: 'sub_categories_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Sub_Categories>;
};

/** input type for inserting object relation for remote table "sub_categories" */
export type Sub_Categories_Obj_Rel_Insert_Input = {
  data: Sub_Categories_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Sub_Categories_On_Conflict>;
};

/** on_conflict condition type for table "sub_categories" */
export type Sub_Categories_On_Conflict = {
  constraint: Sub_Categories_Constraint;
  update_columns?: Array<Sub_Categories_Update_Column>;
  where?: InputMaybe<Sub_Categories_Bool_Exp>;
};

/** Ordering options when selecting data from "sub_categories". */
export type Sub_Categories_Order_By = {
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
};

/** primary key columns input for table: sub_categories */
export type Sub_Categories_Pk_Columns_Input = {
  id: Scalars['Int'];
};

/** select columns of table "sub_categories" */
export enum Sub_Categories_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "sub_categories" */
export type Sub_Categories_Set_Input = {
  id?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Sub_Categories_Stddev_Fields = {
  __typename?: 'sub_categories_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Sub_Categories_Stddev_Pop_Fields = {
  __typename?: 'sub_categories_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Sub_Categories_Stddev_Samp_Fields = {
  __typename?: 'sub_categories_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Sub_Categories_Sum_Fields = {
  __typename?: 'sub_categories_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** update columns of table "sub_categories" */
export enum Sub_Categories_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name'
}

/** aggregate var_pop on columns */
export type Sub_Categories_Var_Pop_Fields = {
  __typename?: 'sub_categories_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Sub_Categories_Var_Samp_Fields = {
  __typename?: 'sub_categories_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Sub_Categories_Variance_Fields = {
  __typename?: 'sub_categories_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "brands" */
  brands: Array<Brands>;
  /** fetch aggregated fields from the table: "brands" */
  brands_aggregate: Brands_Aggregate;
  /** fetch data from the table: "brands" using primary key columns */
  brands_by_pk?: Maybe<Brands>;
  /** fetch data from the table: "categories" */
  categories: Array<Categories>;
  /** fetch aggregated fields from the table: "categories" */
  categories_aggregate: Categories_Aggregate;
  /** fetch data from the table: "categories" using primary key columns */
  categories_by_pk?: Maybe<Categories>;
  /** fetch data from the table: "images" */
  images: Array<Images>;
  /** fetch aggregated fields from the table: "images" */
  images_aggregate: Images_Aggregate;
  /** fetch data from the table: "images" using primary key columns */
  images_by_pk?: Maybe<Images>;
  /** fetch data from the table: "items" */
  items: Array<Items>;
  /** fetch aggregated fields from the table: "items" */
  items_aggregate: Items_Aggregate;
  /** fetch data from the table: "items" using primary key columns */
  items_by_pk?: Maybe<Items>;
  /** fetch data from the table: "sub_categories" */
  sub_categories: Array<Sub_Categories>;
  /** fetch aggregated fields from the table: "sub_categories" */
  sub_categories_aggregate: Sub_Categories_Aggregate;
  /** fetch data from the table: "sub_categories" using primary key columns */
  sub_categories_by_pk?: Maybe<Sub_Categories>;
};


export type Subscription_RootBrandsArgs = {
  distinct_on?: InputMaybe<Array<Brands_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brands_Order_By>>;
  where?: InputMaybe<Brands_Bool_Exp>;
};


export type Subscription_RootBrands_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Brands_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Brands_Order_By>>;
  where?: InputMaybe<Brands_Bool_Exp>;
};


export type Subscription_RootBrands_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootCategoriesArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootCategories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Categories_Order_By>>;
  where?: InputMaybe<Categories_Bool_Exp>;
};


export type Subscription_RootCategories_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootImagesArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Subscription_RootImages_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Images_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Images_Order_By>>;
  where?: InputMaybe<Images_Bool_Exp>;
};


export type Subscription_RootImages_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootItemsArgs = {
  distinct_on?: InputMaybe<Array<Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Items_Order_By>>;
  where?: InputMaybe<Items_Bool_Exp>;
};


export type Subscription_RootItems_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Items_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Items_Order_By>>;
  where?: InputMaybe<Items_Bool_Exp>;
};


export type Subscription_RootItems_By_PkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootSub_CategoriesArgs = {
  distinct_on?: InputMaybe<Array<Sub_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sub_Categories_Order_By>>;
  where?: InputMaybe<Sub_Categories_Bool_Exp>;
};


export type Subscription_RootSub_Categories_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Sub_Categories_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Sub_Categories_Order_By>>;
  where?: InputMaybe<Sub_Categories_Bool_Exp>;
};


export type Subscription_RootSub_Categories_By_PkArgs = {
  id: Scalars['Int'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

export type GetItemListByAdminContainerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemListByAdminContainerQuery = (
  { __typename?: 'query_root' }
  & { items: Array<(
    { __typename?: 'items' }
    & Pick<Items, 'id' | 'name' | 'regular_price' | 'current_price' | 'current_count' | 'gender' | 'can_sale' | 'is_rental_available' | 'next_lending_date'>
  )> }
);

export type GetItemsTestQueryVariables = Exact<{ [key: string]: never; }>;


export type GetItemsTestQuery = (
  { __typename?: 'query_root' }
  & { items: Array<(
    { __typename?: 'items' }
    & Pick<Items, 'id' | 'name'>
  )> }
);


export const GetItemListByAdminContainerDocument = gql`
    query getItemListByAdminContainer {
  items {
    id
    name
    regular_price
    current_price
    current_count
    gender
    can_sale
    is_rental_available
    next_lending_date
  }
}
    `;

/**
 * __useGetItemListByAdminContainerQuery__
 *
 * To run a query within a React component, call `useGetItemListByAdminContainerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemListByAdminContainerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemListByAdminContainerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetItemListByAdminContainerQuery(baseOptions?: Apollo.QueryHookOptions<GetItemListByAdminContainerQuery, GetItemListByAdminContainerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemListByAdminContainerQuery, GetItemListByAdminContainerQueryVariables>(GetItemListByAdminContainerDocument, options);
      }
export function useGetItemListByAdminContainerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemListByAdminContainerQuery, GetItemListByAdminContainerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemListByAdminContainerQuery, GetItemListByAdminContainerQueryVariables>(GetItemListByAdminContainerDocument, options);
        }
export type GetItemListByAdminContainerQueryHookResult = ReturnType<typeof useGetItemListByAdminContainerQuery>;
export type GetItemListByAdminContainerLazyQueryHookResult = ReturnType<typeof useGetItemListByAdminContainerLazyQuery>;
export type GetItemListByAdminContainerQueryResult = Apollo.QueryResult<GetItemListByAdminContainerQuery, GetItemListByAdminContainerQueryVariables>;
export const GetItemsTestDocument = gql`
    query getItemsTest {
  items {
    id
    name
  }
}
    `;

/**
 * __useGetItemsTestQuery__
 *
 * To run a query within a React component, call `useGetItemsTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemsTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetItemsTestQuery(baseOptions?: Apollo.QueryHookOptions<GetItemsTestQuery, GetItemsTestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetItemsTestQuery, GetItemsTestQueryVariables>(GetItemsTestDocument, options);
      }
export function useGetItemsTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetItemsTestQuery, GetItemsTestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetItemsTestQuery, GetItemsTestQueryVariables>(GetItemsTestDocument, options);
        }
export type GetItemsTestQueryHookResult = ReturnType<typeof useGetItemsTestQuery>;
export type GetItemsTestLazyQueryHookResult = ReturnType<typeof useGetItemsTestLazyQuery>;
export type GetItemsTestQueryResult = Apollo.QueryResult<GetItemsTestQuery, GetItemsTestQueryVariables>;