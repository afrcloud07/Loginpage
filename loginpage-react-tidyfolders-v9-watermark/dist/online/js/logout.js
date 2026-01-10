import{u as t,j as n,i as o,c as i,W as a}from"./chunks/useMT.js";function r(){const e=t();return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:`
        * { box-sizing: border-box; }
        body {
          background: #000; color: #fff; font-family: sans-serif;
          min-height: 100vh; margin: 0; display: flex; flex-direction: column;
          justify-content: center; align-items: center; text-align: center;
          padding: 24px;
        }
        h2 { font-weight: 300; font-size: 2rem; margin: 0 0 10px; }
        p { color: #666; margin: 0 0 40px; max-width: 520px; line-height: 1.5; }

        .actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          max-width: 520px;
        }
        form { margin: 0; }

        button {
          padding: 15px 40px;
          border-radius: 999px;
          font-weight: bold;
          cursor: pointer;
          border: none;
          transition: 0.2s;
          min-width: 160px;
          height: 52px;
        }

        .yes { background: #fff; color: #000; }
        .yes:hover { background: #ddd; }

        .no {
          background: transparent;
          color: #9a9a9a;
          border: 1px solid #333;
        }
        .no:hover { border-color: #fff; color: #fff; }

        /* Mobile: tombol jadi satu kolom, rata tengah dan lebar sama */
        @media (max-width: 420px) {
          .actions { flex-direction: column; gap: 12px; }
          form { width: 100%; }
          button { width: 100%; min-width: 0; max-width: 320px; margin: 0 auto; }
        }
      `}),n.jsx("h2",{children:"Putuskan Koneksi?"}),n.jsx("p",{children:"Anda harus login kembali untuk menggunakan internet."}),n.jsxs("div",{className:"actions",children:[n.jsxs("form",{action:o(e.linkLogout)?e.linkLogout:"#",name:"logout",method:"post",children:[n.jsx("input",{type:"hidden",name:"erase-cookie",value:"on"}),n.jsx("button",{type:"submit",className:"yes",children:"YA"})]}),n.jsx("button",{onClick:()=>location.href="status.html",className:"no",children:"BATAL"})]})]})}i.createRoot(document.getElementById("root")).render(n.jsxs(n.Fragment,{children:[n.jsx(r,{}),n.jsx(a,{})]}));
