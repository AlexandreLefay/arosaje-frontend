import React from 'react';
import {Button} from 'react-native-paper'
import {View, Text, Modal, ScrollView} from 'react-native';
import {Style} from "../Style";
import {Card} from "react-native-paper";

const TermsAndConditionsPopup = ({ visible, onClose, onAccept }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <ScrollView style={Style.container}>
        <Card style={Style.card}>
              <Text style={Style.title}>
                Conditions générales d'utilisation
              </Text>
              <Text style={Style.paragraph_italic}>
                Conformément au règlement général sur la protection des données (RGPD), une information concise, transparente, compréhensible et aisément accessible des personnes concernées doit être mise à disposition des utilisateurs de notre service. Cette obligation de transparence est définie aux articles 12, 13 et 14 du RGPD.
              </Text>
              <Text style={Style.paragraph}>
                Dans le cadre de l’utilisation de son application Arosa-je, l’entreprise Arosa-je hébergée à l’EPSI Nantes, au 16 bd Général de Gaule, 44200 Nantes, met en place la collecte d’informations personnelles.
              </Text>
              <Text style={Style.paragraph}>
                Par l’acceptation de ces conditions générale d’utilisation, l’utilisateur accepte de fournir les informations qui lui sont demandées. En cas de refus, il n’est pas possible d’utiliser cette application de demande de garde de plante.
              </Text>
              <Text style={Style.paragraph}>
                Ces dernières ne seront pas utilisées par l’entreprise et sont mises à disposition au gardien qui aura été validé par le propriétaire des plantes à garder. L’adresse est donc nécessaire pour permettre cette mise en relation et la recherche géographique de demande de garde. Le numéro de téléphone peut être renseigné pour faciliter les échanges dans le cadre d’une relation de gardiennage. Néanmoins, ce dernier n’est pas nécessaire dans la mesure ou un service de messagerie entre utilisateur est mis en place au sein de l’application.
              </Text>
              <Text style={Style.paragraph}>
                Nous rappelons que les messages transmis entre utilisateurs ainsi que le contenu des images diffusées n’engagent que l’auteur de ces derniers. Nous tenons aussi à alerter sur la confidentialité des données à y faire transiter.
              </Text>
              <Text style={Style.paragraph}>
                En aucun cas ces données ne seront divulguées à un tiers autre que ceux approuvés par l’utilisateur.
              </Text>
              <Text style={Style.paragraph}>
                Les données collectées dans le cadre de l’inscription à la plateforme arosa-je sont conservées pour un maximum de 24 mois reconduis à chaque connexion. Dans le cas de compte non-utilisé, un message avertissant de la suppression de ce dernier est envoyé au bout de 23 mois, soit 1 mois avant la suppression effective.
              </Text>
              <Text style={Style.paragraph}>
                À tout moment, l’utilisateur peut modifier ou supprimer ses données personnelles. L’accès à cette opération se faisant par l’intermédiaire de la page « mon profil ».
              </Text>
              <Text style={Style.paragraph}>
                Pour toute information complémentaire, n’hésitez pas à contacter notre délégué à la protection des données : contact-protections-données@arosa-je.fr De même, les conditions générales d’utilisation restent accessibles par l’onglet « A propos de nous ».
              </Text>
              <Text style={Style.paragraph}>
                En cas de difficulté rencontrée avec nos services, il vous est possible d’introduire une réclamation auprès de la CNIL.
              </Text>
              <Text style={Style.paragraph}>
                En cas de modification de ces conditions générales d’utilisation, chaque utilisateur en sera alerté par un courriel 1 mois avant son application. En cas de refus, l’utilisateur conservera la possibilité de supprimer son compte.
              </Text>
            <View style={Style.containerHorizontal}>
              <Button style={Style.button} title="Accepter" onPress={onAccept}>Accepter</Button>
              <Button style={Style.button} title="Refuser" onPress={onClose}>Refuser</Button>
          </View>
        </Card>
      </ScrollView>
    </Modal>
  );
};

export default TermsAndConditionsPopup;
