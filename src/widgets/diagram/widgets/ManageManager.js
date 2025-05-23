import Naming from "@/utils/Naming";
import Manager from "./Manager";
import Shield from "./Shield";
import TextWidget from "./TextWidget";
// import CylinderShield from "./CylinderShield";

class ManageManager {

    static setUp = () => {
        Manager.Naming = Naming;
        Manager.Shield = Shield;
        Manager.TextWidget = TextWidget;
        // Manager.CylinderShield = CylinderShield;
    }

}

export default ManageManager;