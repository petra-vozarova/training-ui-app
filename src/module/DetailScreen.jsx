import { DateTime, ResultCard } from "asab_webui_components";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export function DetailScreen() {
  const { id } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const fetchUserDetail = useCallback(async () => {
    // loads user data, sets loading state, and handles errors
    setLoading(true);
    const u = new URL(`https://devtest.teskalabs.com/detail/${id}`);
    try {
      const response = await fetch(u);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setUserDetail(data);
    } catch (error) {
      console.error("Error fetching user detail:", error);
      setError(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUserDetail();
  }, [fetchUserDetail]);

  const body = useMemo(() => {
    // Render user detail information
    if (!userDetail) return null;
    return (
      <div className={`card text-start p-3 d-flex flex-column gap-1 `}>
        <div title={userDetail.id}>
          <strong>{t("DetailCard|Username")}:</strong> {userDetail.username}
        </div>
        <div>
          <strong>{t("DetailCard|Email")}:</strong> {userDetail.email}
        </div>
        <div>
          <strong>{t("DetailCard|Created at")}:</strong>{" "}
          <DateTime value={userDetail.created} />
        </div>
        <div>
          <strong>{t("DetailCard|Last sign in")}:</strong>{" "}
          <DateTime value={userDetail.last_sign_in} />
        </div>
        <div>
          <strong>{t("DetailCard|Address")}:</strong> {userDetail.address}
        </div>
        <div>
          <strong>{t("DetailCard|Phone")}:</strong> {userDetail.phone_number}
        </div>
        <div>
          <strong>{t("DetailCard|Ip address")}:</strong> {userDetail.ip_address}
        </div>
        <div>
          <strong>{t("DetailCard|Mac address")}:</strong>{" "}
          {userDetail.mac_address}
        </div>
      </div>
    );
  }, [userDetail, t]);

  return (
    <div className="card w-100 h-100">
      <div className="card-header">
        <Link to="/" className="btn btn-outline-primary mb-3 float-start">
          <i className="bi bi-house"></i> Home
        </Link>
        <div className="d-flex flex-row align-items-center justify-content-center gap-2">
          {loading && (
            <div
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></div>
          )}
          <h1 className="text-center">{t("DetailCard|User Detail Screen")}</h1>
        </div>
      </div>

      <div className="h-100">
        {error && (
          <div className="alert alert-danger text-center">
            {t("DetailCard|Error fetching user details")}
          </div>
        )}
        {loading && (
          <div className="text-center">
            {t("DetailCard|Loading user details...")}
          </div>
        )}
        {userDetail !== null && <ResultCard body={body} />}
      </div>
    </div>
  );
}
