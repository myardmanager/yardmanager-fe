"use client";

import SearchIcon from "../../../assets/main/30-search.svg";
import React, { useEffect, useRef } from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import MenuIcon from "../../../assets/main/59-menu.svg";
import InvIcon from "../../../assets/main/60-inv.svg";
import VhcIcon from "../../../assets/main/61-hc.svg";
import InvoiceIcon from "../../../assets/main/62-invo.svg";
import EmpIcon from "../../../assets/main/63-emp.svg";
import ArrowIcon from "../../../assets/main/28-downarrow.svg";

import CountBlock from "../../../components/dashboard/CountBlock";
import BarChart from "../../../components/dashboard/BarChart";
import { setCurrentPage, setShowToast } from "../../../../lib/features/shared/sharedSlice";
import { useDispatch, useSelector } from "react-redux";
import TableHead from "../../../components/common/TableHead";
import TableRow from "../../../components/common/TableRow";
import { calcTotalPage, displayData } from "../../../helpers/pagination";
import { fetchInvoicesByPage } from "../../../../lib/features/invoice/invoiceActions";
import { useRouter } from "next/navigation";
import {
	fetchCounts,
	fetchInventoryCounts,
	fetchPartCounts
} from "../../../../lib/features/dashboard/dashboardActions";
import { resetState } from "../../../../lib/features/dashboard/dashboardSlice";
import axios from "axios";
import { getCookie } from "../../../helpers/storage";
const montserrat = Montserrat({ subsets: ["latin"] });

const page = () => {
	const { error, invoiceData, totalDataLength } = useSelector((state) => state.invoice);
	const state = useSelector((state) => state);
	const { showSideMenu } = useSelector((state) => state.shared);
	const {
		toastMsg,
		error: dsbdError,
		counts,
		inventoryGraphData,
		partGraphData
	} = useSelector((state) => state.dashboard);
	const router = useRouter();

	const dispatch = useDispatch();
	const [dataFromServer, setDataFromServer] = React.useState([]);
	const [pageNumber, setPageNumber] = React.useState(1);
	const [totalPage, setTotalPage] = React.useState(0);
	const [data, setData] = React.useState({});

	useEffect(() => {
		dispatch(setCurrentPage("Dashboard"));
		dispatch(fetchInvoicesByPage({ page: pageNumber }));
	}, [dispatch, pageNumber]);

	useEffect(() => {
		dispatch(fetchCounts());
		dispatch(fetchInventoryCounts("month"));
		dispatch(fetchPartCounts("month"));

		// return () => {
		// 	dispatch(resetState());
		// };
	}, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      let token = await getCookie("token");
      console.log(state);
      console.log(token);
      axios
        .get("https://yardmanager-be.vercel.app/api/analytics/count", {headers: {Authorization: `Bearer ${token}`}})
        .then((res) => {
          console.log('response');
          console.log(res.data);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);


	useEffect(() => {
		if (counts) {
			console.log(counts);
		}
	}, [counts, inventoryGraphData, partGraphData]);

	// if is there to prevent render on page load
	useEffect(() => {
		if (toastMsg) {
			dispatch(setShowToast({ value: true, msg: toastMsg }));
		}
	}, [toastMsg, dsbdError]);

	useEffect(() => {
		if (error) {
			console.log(error);
		}
		// When invoice data has come set total pages
		if (invoiceData) {
			setDataFromServer(invoiceData);
			let { totalPage } = calcTotalPage(totalDataLength);
			setTotalPage(totalPage);
		}
	}, [error, invoiceData]);

	// If clicked on edit or preview button  of action menu then redirect to create page
	useEffect(() => {
		if (showSideMenu.mode === "edit" || showSideMenu.mode === "preview") {
			router.push(`/invoices/create`);
		}
	}, [showSideMenu]);

	// Search function
	const handleSearch = (e) => {
		dispatch(fetchInvoicesByPage({ search: e.target.value }));
	};
	return (
		// Width screen actullay also takes scrollbar width so that seems cut. Giving it outside container to avoid that
		// pr-6 for small devices to make content away from scrollbar due to screen width
		<div className="p-4 pt-6 md:pr-4 bg-[#f9fafb] relative flex-1 flex flex-col gap-8 w-screen md:w-full ">
			{/* First container */}
			<div className="w-full bg-white flex flex-col items-start justify-start  p-4 rounded-xl gap-6 border border-gray-300">
				{/* Container for Text and filter btn */}
				<div className="flex justify-between items-center w-full">
					<p className={`font-bold text-base  ${montserrat.className} tracking-wider`}>
						AI Auto Parts
					</p>
					<div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
						<p>Filter</p>
						<Image src={MenuIcon} alt="MenuIcon" />
					</div>
				</div>
				{/* 4 BLocks container */}
				<div className="flex w-full justify-between items-center gap-5 flex-wrap">
					<CountBlock title={"Inventory Added"} icon={InvIcon} count={data?.inventories ?? 0} />
					<CountBlock title={"Parts"} icon={VhcIcon} count={data?.parts ?? 0} />
					<CountBlock title={"Locations"} icon={InvoiceIcon} count={data?.locations ?? 0} />
					<CountBlock title={"Employees"} icon={EmpIcon} count={data?.employees ?? 0} />
				</div>
			</div>
			{/* Container of 2 charts */}
			<div className="w-full flex-col md:flex-row flex justify-center items-center gap-4">
				<div className="w-full p-4 rounded-xl border border-gray-300 bg-white">
					{/* First Chart */}
					<div className="w-full flex-col  max-h-80 pb-4  flex items-center justify-between">
						{/* Text and input container */}
						<div className="w-full flex items-center justify-between">
							<p className="font-bold text-lg">Vehicles Added</p>
							{/* Time select input */}
							<div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
								<p>Weekly</p>
								<Image src={ArrowIcon} alt="ArrowIcon" />
							</div>
						</div>
						{/* Chart */}
						<BarChart
							label={"Vehicles"}
							data={[15, 13, 61, 14, 56, 72, 21, 31, 89, 14, 56, 72]}
							greenColor={true}
						/>
					</div>
				</div>
				<div className="w-full p-4 rounded-xl border border-gray-300 bg-white">
					{/* Second Chart Container*/}

					<div className="w-full flex-col  max-h-80 pb-4  flex items-center justify-between">
						{/* Text and input container */}
						<div className="w-full flex items-center justify-between">
							<p className="font-bold text-lg">Parts Inventoried</p>
							{/* Time select input */}
							<div className="p-2 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg flex justify-between items-center space-x-3">
								<p>Weekly</p>
								<Image src={ArrowIcon} alt="ArrowIcon" />
							</div>
						</div>
						{/* Chart */}
						<BarChart
							label={"Parts"}
							data={[15, 13, 61, 14, 56, 72, 21, 31, 89, 14, 56, 72]}
							greenColor={false}
						/>
					</div>
				</div>
			</div>
			{/* Table */}
			<div className=" border rounded-xl border-gray-300 flex flex-col">
				{/* Table Title container */}
				<div className="p-4 w-full gap-2 rounded-t-lg flex justify-between items-center">
					<p className="hidden sm:block font-bold text-lg md:text-2xl">Invoices List</p>
					<p className="sm:hidden font-bold text-lg md:text-2xl">Invoices</p>
					{/* Search abd filter input container*/}
					<div className="flex  space-x-2 sm:space-x-4">
						<div className="flex p-2 w-32 sm:w-60 rounded-lg  space-x-2 border-[1.5px] border-gray-300">
							<Image src={SearchIcon} alt="SearchIcon" />
							<input
								type="text"
								placeholder="Search"
								className="w-full outline-none bg-transparent"
								onChange={handleSearch}
							/>
						</div>
					</div>
				</div>
				{/* Table Container */}
				<div className=" overflow-auto overflow-y-visible">
					{/* Head */}
					<TableHead titles={["Name", "ID", "Email", "Phone", "Amount", "Date", "Status"]} />
					{/* Body */}
					{dataFromServer.map((data, index) => (
						<TableRow
							titles={[
								data.name,
								data._id,
								data.email,
								data.phone,
								data.paid,
								data.datePaid,
								data.status
							]}
							key={index}
							rowIndex={index}
							item={data}
						/>
					))}
				</div>
				{/* Footer */}
				<div className="p-4 w-full rounded-b-lg flex justify-between items-center">
					<p className="font-semibold text-sm">
						Page {pageNumber} of {totalPage}
					</p>
					<div className="flex space-x-2">
						<div
							onClick={() => setPageNumber(pageNumber === 1 ? 1 : pageNumber - 1)}
							className="cursor-pointer hover:bg-gray-300 py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg">
							Previous
						</div>
						<div
							onClick={() => setPageNumber(pageNumber === totalPage ? pageNumber : pageNumber + 1)}
							className="cursor-pointer hover:bg-gray-300 py-2 px-4 border border-gray-300 text-sm font-bold rounded-lg">
							Next
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default page;
