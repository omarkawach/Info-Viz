import { features } from "../data/CSDs_LFLs.json";

class LoadCSD{
    load = (setState) => { setState(features); }
}

export default LoadCSD;