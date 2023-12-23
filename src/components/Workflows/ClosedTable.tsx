import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useApi } from '../../hooks/useApi';
import GanymedeLoader from '../Utils/GanymedeLoader';
import { Table } from '@mantine/core';
import WorkflowStatusCompleted from './Status/Completed';
import WorkflowStatusRunning from './Status/Running';
import dayjs from 'dayjs';
import Link from 'next/link';
import WorkflowStatusCancelled from './Status/Cancelled';
import WorkflowStatusTerminated from './Status/Terminated';

type Props = {}

const WorkflowsClosedTable = (props: Props) => {

  const { isLoading, error, data } = useQuery({
    queryKey: ["workflows-closed"],
    queryFn: async () =>
      useApi(
        {
          method: "GET",
          url: "/api/v1/workflows/closed",
          withCredentials: true,
        },
        false
      ).then((res) => res?.data),
  });

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <GanymedeLoader />;

  if (!data) return <div>No data</div>

  console.log(data)

  const rows = data.map((workflow: any) => (
    <Table.Tr key={workflow.execution.run_id}>
      <Table.Td>
        {workflow.status == 1 && <WorkflowStatusRunning />}
        {workflow.status == 2 && <WorkflowStatusCompleted />}
        {workflow.status == 4 && <WorkflowStatusCancelled />}
        {workflow.status == 5 && <WorkflowStatusTerminated />}
      </Table.Td>
      <Table.Td>{workflow.execution.workflow_id}</Table.Td>
      <Table.Td>
        <Link href={`/workflows/${workflow.execution.workflow_id}/${workflow.execution.run_id}`}>
          <span>
            {workflow.execution.run_id}
          </span>
        </Link>
      </Table.Td>
      <Table.Td>{workflow.type.name}</Table.Td>
      <Table.Td>{dayjs(workflow.close_time).format("YYYY/MM/DD HH:mm:ss")}</Table.Td>
    </Table.Tr>
  ));

  return (
    <div>
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Status</Table.Th>
            <Table.Th>Workflow ID</Table.Th>
            <Table.Th>Run ID</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Close Time</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  )
}

export default WorkflowsClosedTable