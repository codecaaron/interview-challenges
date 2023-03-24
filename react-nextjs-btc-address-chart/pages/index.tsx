import Head from "next/head";
import Layout from "../components/layout";
import { GetServerSideProps } from "next";
import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, startOfYear, sub } from "date-fns/fp";
import { Day } from "../constants/day";
import { formatNumber } from "../utils/formatNumber";
import { useDeferredRender } from "../hooks/useDeferredRender";
import { BtcAddressChart } from "../components/BtcAddressChart";

export default function Home({ data }: { data: Day[] }) {
  return (
    <Layout home>
      <Head>
        <title>BTC Address Balances over Time</title>
      </Head>
      <section>
        <BtcAddressChart data={data} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `http://${context.req.headers.host}/api/btc-addresses`,
    {
      headers: {
        "Accept-Charset": "utf-8",
        "content-type": "text/json;charset=UTF-8",
      },
    }
  );

  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
