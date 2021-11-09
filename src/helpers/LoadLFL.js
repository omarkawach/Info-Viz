import { features } from "../data/LFLs_assigned.json";

class LoadLFL{
    load = (setState) => { setState(features); }
}

export default LoadLFL;