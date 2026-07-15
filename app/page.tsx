import {
  getPortada,
  getQuienesSomosTitulo,
  getDiferenciales,
  getLineasNegocio,
  getTkcCorp,
  getHidriko,
  getTkcSecurity,
  getTkcHome,
  getExperienciaSectores,
  getReferenciasComerciales,
  getContacto,
} from "@/lib/content";
import { getClientLogos } from "@/lib/clients";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import QuienesSomos from "@/components/quienes-somos/QuienesSomos";
import LineasNegocio from "@/components/lineas-negocio/LineasNegocio";
import TkcCorpSection from "@/components/lineas/TkcCorpSection";
import HidrikoSection from "@/components/lineas/HidrikoSection";
import TkcSecuritySection from "@/components/lineas/TkcSecuritySection";
import TkcHomeSection from "@/components/lineas/TkcHomeSection";
import ExperienciaSectores from "@/components/sectores/ExperienciaSectores";
import ReferenciasComerciales from "@/components/referencias/ReferenciasComerciales";
import ContactoSection from "@/components/contacto/ContactoSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  const portada = getPortada();
  const quienesSomosTitulo = getQuienesSomosTitulo();
  const diferenciales = getDiferenciales();
  const lineasNegocio = getLineasNegocio();
  const tkcCorp = getTkcCorp();
  const hidriko = getHidriko();
  const tkcSecurity = getTkcSecurity();
  const tkcHome = getTkcHome();
  const experienciaSectores = getExperienciaSectores();
  const referenciasComerciales = getReferenciasComerciales();
  const contacto = getContacto();
  const clientLogos = getClientLogos();

  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero portada={portada} />
        <QuienesSomos titulo={quienesSomosTitulo} diferenciales={diferenciales} />
        <LineasNegocio lineasNegocio={lineasNegocio} />
        <TkcCorpSection data={tkcCorp} />
        <HidrikoSection data={hidriko} />
        <TkcSecuritySection data={tkcSecurity} />
        <TkcHomeSection data={tkcHome} />
        <ExperienciaSectores data={experienciaSectores} />
        <ReferenciasComerciales data={referenciasComerciales} logos={clientLogos} />
        <ContactoSection data={contacto} />
      </main>
      <Footer
        fraseFinalMarca={contacto.fraseFinalMarca}
        fraseFinalTexto={contacto.fraseFinalTexto}
      />
    </>
  );
}
