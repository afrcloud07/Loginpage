import React, { useEffect, useRef, useState } from "react";
import AnalogClockCanvas from "../components/AnalogClockCanvas";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import { isFilled, safe } from "../lib/mikrotik";
import { useMT } from "../hooks/useMT";
import { hexMD5 } from "../lib/md5";

export default function OnlineLogin() {
  const mt = useMT();
  const { message, visible, showToast } = useToast(5000);
  const [isMember, setIsMember] = useState(false);

  const usernameRef = useRef(null);
  const passRef = useRef(null);

  useEffect(() => {
    if (isFilled(mt.error)) showToast(mt.error);
  }, [mt.error, showToast]);

  const onUsernameInput = (e) => {
    if (!isMember && passRef.current) {
      passRef.current.value = e.target.value;
    }
  };

  const toggleMode = () => {
    setIsMember((v) => !v);
    if (usernameRef.current) usernameRef.current.value = "";
    if (passRef.current) passRef.current.value = "";
    setTimeout(() => usernameRef.current?.focus(), 0);
  };

  const onSubmit = (e) => {
    const u = usernameRef.current?.value?.trim() || "";
    const p = passRef.current?.value?.trim() || "";

    if (!u) {
      e.preventDefault();
      showToast("Masukkan kode voucher atau username member");
      return;
    }

    if (isMember && !p) {
      e.preventDefault();
      showToast("Masukkan kata sandi");
      return;
    }

    // CHAP-MD5
    if (isFilled(mt.chapId) && isFilled(mt.chapChallenge) && passRef.current?.value) {
      passRef.current.value = hexMD5(String(mt.chapId) + String(passRef.current.value) + String(mt.chapChallenge));
    }
  };

  const trialEnabled = String(mt.trial || "").toLowerCase() === "yes";
  const trialHref =
  (isFilled(mt.linkLoginOnly) ? mt.linkLoginOnly : "#") +
  "?dst=" +
  // $(link-orig-esc) dan $(mac-esc) SUDAH dalam bentuk escaped, jangan di-encode lagi
  (isFilled(mt.linkOrigEsc) ? String(mt.linkOrigEsc) : "") +
  "&username=T-" +
  (isFilled(mt.macEsc) ? String(mt.macEsc) : "");


  return (
    <>
      <Toast message={message} visible={visible} />

      <div className="main-wrapper">
        <div className="greeting-section">
          <div className="status-badge">✅ CONNECTED ✅</div>

          <div className="clock-container">
            <AnalogClockCanvas />
          </div>

          <div className="wifi-name" style={{ fontSize: "2rem", lineHeight: 1.15, wordBreak: "break-word" }}>{safe(mt.identity)}</div>
        </div>

        <div className="input-hero">
          <form
            name="login"
            action={isFilled(mt.linkLoginOnly) ? mt.linkLoginOnly : "#"}
            method="post"
            onSubmit={onSubmit}
          >
            <input type="hidden" name="dst" value={isFilled(mt.linkOrig) ? mt.linkOrig : ""} />
            <input type="hidden" name="popup" value="true" />

            <div className="hero-field">
              <input
                ref={usernameRef}
                type="text"
                name="username"
                id="username"
                className="big-input"
                placeholder={isMember ? "Username Member" : "Masukkan Kode Voucher"}
                required
                autoComplete="off"
                onInput={onUsernameInput}
              />
            </div>

            {isMember ? (
              <div className="hero-field" id="passField">
                <input
                  ref={passRef}
                  type="password"
                  name="password"
                  id="password"
                  className="big-input"
                  placeholder="Kata Sandi"
                />
              </div>
            ) : (
              <input ref={passRef} type="hidden" name="password" id="password" defaultValue="" />
            )}

            <button type="submit" className="action-btn">
              HUBUNGKAN
            </button>
          </form>
        </div>

        <div className="footer-nav">
          <a className="nav-link" onClick={toggleMode} id="modeSwitch">
            {isMember ? "PAKAI VOUCHER" : "LOGIN MEMBER"}
          </a>

          {trialEnabled && (
            <a className="nav-link" href={trialHref}>
              COBA GRATIS
            </a>
          )}
        </div>
      </div>
    </>
  );
}
