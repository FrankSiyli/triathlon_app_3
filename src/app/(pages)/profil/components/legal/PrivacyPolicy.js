import React from "react";
import Link from "next/link";
import ArrowLeftSvg from "@/app/components/SVGs/arrows/ArrowLeftSvg";

function PrivacyPolicy({ setShowProfil }) {
  const handleBackClick = () => {
    setShowProfil();
  };

  return (
    <div>
      <div className="w-full max-w-xl mx-auto">
        <button
          className="top-5 left-5 btn btn-ghost btn-sm  m-3 border border-transparent text-first "
          onClick={handleBackClick}
        >
          <ArrowLeftSvg />
        </button>
      </div>

      <div className="flex mb-20  flex-col  p-4 text-center">
        <p>Datenschutzerklärung</p>
        <br />
        <p>
          Verantwortlicher im Sinne der Datenschutzgesetze, insbesondere der
          EU-Datenschutzgrundverordnung (DSGVO), ist: Frank Siyli
        </p>
        <br />
        <p>
          Einzig ausgeführter Google Analytics Parameter ist: Seitenaufrufe.
        </p>
        <br />
        <p>Bilder von Pixabay.com</p>
        <br />
        <p>Icons von heroicons.com und svgrepo.com</p>
        <br />
        <p>Ihre Betroffenenrechte</p>
        <br />
        <p>
          Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten
          können Sie jederzeit folgende Rechte ausüben: Auskunft über Ihre bei
          uns gespeicherten Daten und deren Verarbeitung (Art. 15 DSGVO),
          Berichtigung unrichtiger personenbezogener Daten (Art. 16 DSGVO),
          Löschung Ihrer bei uns gespeicherten Daten (Art. 17 DSGVO),
          Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund
          gesetzlicher Pflichten noch nicht löschen dürfen (Art. 18 DSGVO),
          Widerspruch gegen die Verarbeitung Ihrer Daten bei uns (Art. 21 DSGVO)
          und Datenübertragbarkeit, sofern Sie in die Datenverarbeitung
          eingewilligt haben oder einen Vertrag mit uns abgeschlossen haben
          (Art. 20 DSGVO). Sofern Sie uns eine Einwilligung erteilt haben,
          können Sie diese jederzeit mit Wirkung für die Zukunft widerrufen. Sie
          können sich jederzeit mit einer Beschwerde an eine Aufsichtsbehörde
          wenden, z. B. an die zuständige Aufsichtsbehörde des Bundeslands Ihres
          Wohnsitzes oder an die für uns als verantwortliche Stelle zuständige
          Behörde. Eine Liste der Aufsichtsbehörden (für den nichtöffentlichen
          Bereich) mit Anschrift finden Sie unter:
        </p>
        <Link href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html">
          www.bfdi.bund.de
        </Link>
        <p>Kontaktformular</p>
        <p>
          Art und Zweck der Verarbeitung: Die von Ihnen eingegebenen Daten
          werden zum Zweck der individuellen Kommunikation mit Ihnen
          gespeichert. Hierfür ist die Angabe einer validen E-Mail-Adresse sowie
          Ihres Namens erforderlich. Diese dient der Zuordnung der Anfrage und
          der anschließenden Beantwortung derselben. Die Angabe weiterer Daten
          ist optional. Rechtsgrundlage: Die Verarbeitung der in das
          Kontaktformular eingegebenen Daten erfolgt auf der Grundlage eines
          berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO). Durch
          Bereitstellung des Kontaktformulars möchten wir Ihnen eine
          unkomplizierte Kontaktaufnahme ermöglichen. Ihre gemachten Angaben
          werden zum Zwecke der Bearbeitung der Anfrage sowie für mögliche
          Anschlussfragen gespeichert. Sofern Sie mit uns Kontakt aufnehmen, um
          ein Angebot zu erfragen, erfolgt die Verarbeitung der in das
          Kontaktformular eingegebenen Daten zur Durchführung vorvertraglicher
          Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO). Empfänger: Empfänger der Daten
          sind ggf. Auftragsverarbeiter. Drittlandtransfer: Die erhobenen Daten
          werden ggfs. in folgende Drittländer übertragen: nein Folgende
          Datenschutzgarantien liegen vor: Speicherdauer: Daten werden
          spätestens 6 Monate nach Bearbeitung der Anfrage gelöscht. Sofern es
          zu einem Vertragsverhältnis kommt, unterliegen wir den gesetzlichen
          Aufbewahrungsfristen nach HGB und löschen Ihre Daten nach Ablauf
          dieser Fristen. Bereitstellung vorgeschrieben oder erforderlich: Die
          Bereitstellung Ihrer personenbezogenen Daten erfolgt freiwillig. Wir
          können Ihre Anfrage jedoch nur bearbeiten, sofern Sie uns Ihren Namen,
          Ihre E-Mail-Adresse und den Grund der Anfrage mitteilen.
        </p>
        <p>Information über Ihr Widerspruchsrecht nach Art. 21 DSGVO</p>
        <p>
          Einzelfallbezogenes Widerspruchsrecht Sie haben das Recht, aus
          Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit
          gegen die Verarbeitung Sie betreffender personenbezogener Daten, die
          aufgrund Art. 6 Abs. 1 lit. f DSGVO (Datenverarbeitung auf der
          Grundlage einer Interessenabwägung) erfolgt, Widerspruch einzulegen;
          dies gilt auch für ein auf diese Bestimmung gestütztes Profiling im
          Sinne von Art. 4 Nr. 4 DSGVO. Legen Sie Widerspruch ein, werden wir
          Ihre personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir
          können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen,
          die Ihre Interessen, Rechte und Freiheiten überwiegen, oder die
          Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von
          Rechtsansprüchen. Empfänger eines Widerspruchs Frank Siyli Änderung
          unserer Datenschutzbestimmungen Wir behalten uns vor, diese
          Datenschutzerklärung anzupassen, damit sie stets den aktuellen
          rechtlichen Anforderungen entspricht oder um Änderungen unserer
          Leistungen in der Datenschutzerklärung umzusetzen, z.B. bei der
          Einführung neuer Services. Für Ihren erneuten Besuch gilt dann die
          neue Datenschutzerklärung. Fragen an den Datenschutzbeauftragten Wenn
          Sie Fragen zum Datenschutz haben, schreiben Sie uns bitte eine E-Mail
          oder wenden Sie sich direkt an die für den Datenschutz verantwortliche
          Person in unserer Organisation: Frank Siyli Die Datenschutzerklärung
          wurde mithilfe der activeMind AG erstellt, den Experten für externe
          Datenschutzbeauftragte (Version #2020-09-30).
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
