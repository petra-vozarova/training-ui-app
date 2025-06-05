import React, { useCallback, useMemo } from "react";
import { Container } from "reactstrap";
import { useTranslation } from "react-i18next";
import { DataTableCard2 } from "asab_webui_components";
import { Link } from "react-router-dom";
import { DateTime } from "asab_webui_components";

export function TableScreen(props) {
  const { t } = useTranslation();

  const columns = useMemo(() => {
    return [
      {
        title: t("TableHeader|Username"),
        thStyle: {
          minWidth: "3rem",
        },
        render: ({ row }) => (
          <Link to={`/detail/${row.id}`} title={row.id}>
            <button className="btn btn-outline-primary w-100 ">
              <i className="bi bi-box-arrow-up-right pe-2"></i>
              {row.username}
            </button>
          </Link>
        ),
      },

      {
        title: t("TableHeader|Created at"),
        thStyle: { minWidth: "4rem" },
        render: ({ row }) => <DateTime value={row.created} />,
      },
      {
        title: t("TableHeader|Last sign in"),
        thStyle: { minWidth: "4rem" },
        render: ({ row }) => <DateTime value={row.last_sign_in} />,
      },
      {
        title: t("TableHeader|Address"),
        thStyle: { minWidth: "4rem" },
        render: ({ row }) => <span>{row.address}</span>,
      },
    ];
  }, [t]);

  const loader = useCallback(async ({ params }) => {
    // Fetch user data from API
    const query = new URLSearchParams({ p: params.p, i: params.i }).toString();
    const url = `https://devtest.teskalabs.com/data?${query}`;
    const response = await fetch(url);
    const { data: rows, count } = await response.json();
    return { count, rows };
  }, []);

  return (
    <Container>
      <DataTableCard2 app={props.app} columns={columns} loader={loader} />
    </Container>
  );
}
