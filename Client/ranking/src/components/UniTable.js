import React, { useState, useCallback, useMemo } from "react"
import { getData } from "../api/getData"
import TablePagination from "./TablePagination"

function UniTable(props) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageCount, setPageCount] = useState(0)
    const [totalRow, setTotalRow] = useState(0)

    const fetchData = useCallback(
        async (pageSize, pageIndex, search, order, year) => {
            setLoading(true)
            let orderid = ""
            let orderkey = ""
            if(order[0] != undefined && order[0] != null){
                orderid = order[0].id 
                orderkey = order[0].desc
            }
           
            const queryOptions = {
                page: pageIndex,
                limit: pageSize,
                search: search,
                orderid: orderid == undefined ? null: orderid,
                orderkey: orderkey == undefined ? null: orderkey,
                year: year == undefined ? 2021 : year,
                category: props['category']
            }
            
            const items = await getData(queryOptions)

            setData(items.data)
            setPageCount(items.totalPage)
            setTotalRow(items.totalRow)
            setLoading(false)
        },
        []
    )

    const columns = useMemo(
        () => [
            {
                Header: "#",
                accessor: "position",
                Cell: ({ row }) => row.original.position,
                disableSortBy: true
            },
            {
                Header: "Uni Name",
                accessor: "uni",
                Cell: ({ row }) => row.original.uni,
                disableSortBy: true
            },
            {
                Header: "Q1",
                accessor: "q1",
                Cell: ({ row }) => {
                    const q1 = row.original.q1
                    if(q1 != null && q1 != undefined)
                        return row.original.q1.toFixed(2)
                    return 0
                }
                    
            },
            {
                Header: "CNCI",
                accessor: "cnci",
                Cell: ({ row }) => {
                    const cnci = row.original.cnci
                    if(cnci != null && cnci != undefined)
                        return row.original.cnci.toFixed(2)
                    return 0
                }
            },
            {
                Header: "IC",
                accessor: "ic",
                Cell: ({ row }) => {
                    const ic = row.original.ic
                    if(ic != null && ic != undefined)
                        return row.original.ic.toFixed(2)
                    return 0
                }
            },
            {
                Header: "TOP",
                accessor: "top",
                Cell: ({ row }) => {
                    const top = row.original.top
                    if(top != null && top != undefined)
                        return row.original.top.toFixed(2)
                    return 0
                }
            },
            {
                Header: "AWARD",
                accessor: "award",
                Cell: ({ row }) => {
                    const award = row.original.award
                    if(award != null && award != undefined)
                        return row.original.award.toFixed(2)
                    return 0
                }
            },
            {
                Header: "TOTAL",
                accessor: "total",
                Cell: ({ row }) => {
                    const total = row.original.total
                    if(total != null && total != undefined)
                        return row.original.total.toFixed(2)
                    return 0
                }
            }

        ],
        []
    )

    return (
        <section>
            <TablePagination
                category={props.category}
                columns={columns}
                data={data}
                fetchData={fetchData}
                loading={loading}
                pageCount={pageCount}
                totalRow={totalRow}
            />
        </section>
    )
}

export default UniTable