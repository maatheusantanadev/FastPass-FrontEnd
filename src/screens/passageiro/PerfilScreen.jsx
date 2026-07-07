import { useNavigate } from "react-router-dom";
import { ScanFace, QrCode, ChevronRight, LogOut, ShieldCheck } from "lucide-react";
import MobileShell from "../../components/MobileShell.jsx";
import TabBar from "../../components/TabBar.jsx";
import Avatar from "../../components/Avatar.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

function Item({ icon: Icon, label, valor, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="tap-target flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-cobalt-tint/40"
    >
      <Icon size={19} strokeWidth={2} className="text-cobalt" />
      <span className="flex-1 text-[15px] text-ink">{label}</span>
      {valor && <span className="text-[13px] text-muted">{valor}</span>}
      <ChevronRight size={17} className="text-muted" />
    </button>
  );
}

export default function PerfilScreen() {
  const navigate = useNavigate();
  const { usuario, sair } = useAuth();

  const nome = usuario?.name ?? "Passageiro";
  const email = usuario?.email ?? "";

  async function sairDaConta() {
    await sair();
    navigate("/login");
  }

  return (
    <MobileShell footer={<TabBar />}>
      <div className="px-5 pb-2 pt-[max(1.25rem,env(safe-area-inset-top))]">
        <h1 className="mb-4 font-display text-[24px] font-medium text-ink">Perfil</h1>
      </div>

      {/* cartão do usuário */}
      <div className="mx-5 flex items-center gap-4 rounded-2xl bg-cobalt p-4 text-white">
        <Avatar nome={nome} size="lg" className="bg-white/20 text-white" />
        <div className="min-w-0 flex-1">
          <p className="font-display text-[19px] font-medium">{nome}</p>
          {email && (
            <p className="truncate text-[13px] text-white/70">{email}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => navigate("/app/perfil/editar")}
          className="tap-target shrink-0 rounded-full bg-white/15 px-4 text-[13px] font-semibold text-white hover:bg-white/25"
        >
          Editar
        </button>
      </div>

      {/* embarque */}
      <div className="mx-5 mt-4">
        <p className="mb-1.5 px-1 text-[12px] font-semibold uppercase tracking-wide text-muted">
          Embarque
        </p>
        <div className="divide-y divide-line rounded-2xl border border-line">
          <Item
            icon={ScanFace}
            label="Reconhecimento facial"
            valor="Atualizar"
            onClick={() => navigate("/faceid")}
          />
          <Item icon={QrCode} label="QR Code de embarque" onClick={() => navigate("/qr")} />
        </div>
      </div>

      {/* conta */}
      <div className="mx-5 mt-4">
        <p className="mb-1.5 px-1 text-[12px] font-semibold uppercase tracking-wide text-muted">
          Conta
        </p>
        <div className="divide-y divide-line rounded-2xl border border-line">
          <Item icon={ShieldCheck} label="Termos e privacidade" onClick={() => navigate("/termos")} />
          <Item icon={LogOut} label="Sair" onClick={sairDaConta} />
        </div>
      </div>

      <div className="h-6" />
    </MobileShell>
  );
}
