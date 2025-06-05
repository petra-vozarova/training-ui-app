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
      <div className={`card text-start p-3 d-flex flex-column gap-1 fs-6`}>
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
    <div className="card m-auto w-75 h-75">
      <div className="card-header w-100 d-flex align-items-center">
        <div className="float-start">
          <Link to="/" className="btn btn-outline-primary mb-2 me-auto">
            <i className="bi bi-house fs-3 me-2"></i>
            <span className="fs-4">Home</span>
          </Link>
        </div>
        <div className="w-75 d-flex flex-row align-items-center justify-content-center gap-2 mb-2">
          {loading && (
            <div
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></div>
          )}
          <h2 className="text-center fs-2">
            {t("DetailCard|User Detail Screen")}
          </h2>
        </div>
      </div>

      <div className="h-100">
        {error && (
          <div className="alert alert-danger text-center fs-5">
            {t("DetailCard|Error fetching user details")}
          </div>
        )}
        {loading && (
          <div className="text-center fs-5">
            {t("DetailCard|Loading user details...")}
          </div>
        )}
        {userDetail !== null && <ResultCard body={body} />}
      </div>
    </div>
  );
}
