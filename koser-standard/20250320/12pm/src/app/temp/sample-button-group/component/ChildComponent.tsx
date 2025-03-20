type FilteredDataDetailProps = {
  userId: number | null,
  id: number | null,
  title: string,
  completed: boolean,
}

type FilteredDataProps = {
  filteredData: FilteredDataDetailProps;
}

export default function ChildComponent({
                                         filteredData
                                       }: FilteredDataProps) {
  const {userId, id, title, completed} = filteredData

  return (
    <>
      {!!id && (
        <>
          <div>{userId}</div>
          <div>{id}</div>
          <div>{title}</div>
          <div>{completed}</div>
        </>
      )}
    </>
  )
}