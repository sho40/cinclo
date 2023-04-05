import { gql } from '@apollo/client'
import { useGetItemListByAdminContainerQuery } from '@/libs/apollo/graphql'
import dynamic from "next/dynamic";
import { Admin, Resource, ListGuesser, LegacyDataProvider } from 'react-admin';
import { useEffect, useState } from 'react';

const AdminContainerNoSSR = dynamic(() => import('./adminContainer'), {
  ssr: false
});

export default function AdminIndex() {
  return (
    <>
      <AdminContainerNoSSR />
    </>
  )
}
