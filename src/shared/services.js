import Helper from "shared/helper";
import { apiUrl as serverApi } from "config";

const GetEntityInfo = async (name) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}${name}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}



 


	    
	 	
	
		
/* Vehicles */

const GetVehiclesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Vehicles/$count`;
        if (query) url = `${serverApi}Vehicles/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetVehiclesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Vehicles`;
        if (query) url = `${serverApi}Vehicles?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetVehicleSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Vehicles(${id})`;
        if (params) {
            url = `${serverApi}Vehicles(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetVehicleSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.VehId;
        let method = "POST";
        let url = `${serverApi}Vehicles`;
        if (input.VehId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Vehicles(${input.VehId})`;
        } else if (input.VehId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Vehicles(${input.VehId})`;
        }

        delete input['VehId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.VehId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   							// For Nested APIs
			/* $navPropName */
const SetVehicleOtherImagesJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.DocId;
        let method = "POST";
        let url = `${serverApi}Documents`;
        if (input.DocId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Documents(${id})`;
        } else if (input.DocId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Documents(${id})`;
        }

        delete input['DocId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.DocId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetVehicleOtherImagesJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Documents(${id})`;
        if (filter) {
            url = `${serverApi}Documents?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            	   							// For Nested APIs
			/* $navPropName */
const SetVehicleOffered_PackagesJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CmId;
        let method = "POST";
        let url = `${serverApi}Packages`;
        if (input.CmId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Packages(${id})`;
        } else if (input.CmId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Packages(${id})`;
        }

        delete input['CmId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CmId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetVehicleOffered_PackagesJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Packages(${id})`;
        if (filter) {
            url = `${serverApi}Packages?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            	   							// For Nested APIs
			/* $navPropName */
const SetVehicleOffered_Insurance_PlansJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.InsuranceId;
        let method = "POST";
        let url = `${serverApi}Insurances`;
        if (input.InsuranceId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Insurances(${id})`;
        } else if (input.InsuranceId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Insurances(${id})`;
        }

        delete input['InsuranceId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.InsuranceId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetVehicleOffered_Insurance_PlansJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Insurances(${id})`;
        if (filter) {
            url = `${serverApi}Insurances?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            	   		
	
	    
	 	
	
		
/* Insurances */

const GetInsurancesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Insurances/$count`;
        if (query) url = `${serverApi}Insurances/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetInsurancesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Insurances`;
        if (query) url = `${serverApi}Insurances?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetInsuranceSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Insurances(${id})`;
        if (params) {
            url = `${serverApi}Insurances(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetInsuranceSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.InsuranceId;
        let method = "POST";
        let url = `${serverApi}Insurances`;
        if (input.InsuranceId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Insurances(${input.InsuranceId})`;
        } else if (input.InsuranceId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Insurances(${input.InsuranceId})`;
        }

        delete input['InsuranceId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.InsuranceId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
	 	
	
		
/* Models */

const GetModelsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Models/$count`;
        if (query) url = `${serverApi}Models/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetModelsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Models`;
        if (query) url = `${serverApi}Models?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetModelSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Models(${id})`;
        if (params) {
            url = `${serverApi}Models(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetModelSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ModelId;
        let method = "POST";
        let url = `${serverApi}Models`;
        if (input.ModelId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Models(${input.ModelId})`;
        } else if (input.ModelId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Models(${input.ModelId})`;
        }

        delete input['ModelId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ModelId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
	 	
	
		
/* Charges */

const GetChargesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Charges/$count`;
        if (query) url = `${serverApi}Charges/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetChargesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Charges`;
        if (query) url = `${serverApi}Charges?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetChargeSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Charges(${id})`;
        if (params) {
            url = `${serverApi}Charges(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetChargeSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ChargeId;
        let method = "POST";
        let url = `${serverApi}Charges`;
        if (input.ChargeId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Charges(${input.ChargeId})`;
        } else if (input.ChargeId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Charges(${input.ChargeId})`;
        }

        delete input['ChargeId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ChargeId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
	 	
	
		
/* Bookings */

const GetBookingsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Bookings/$count`;
        if (query) url = `${serverApi}Bookings/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetBookingsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Bookings`;
        if (query) url = `${serverApi}Bookings?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetBookingSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Bookings(${id})`;
        if (params) {
            url = `${serverApi}Bookings(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetBookingSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.BookingId;
        let method = "POST";
        let url = `${serverApi}Bookings`;
        if (input.BookingId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Bookings(${input.BookingId})`;
        } else if (input.BookingId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Bookings(${input.BookingId})`;
        }

        delete input['BookingId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.BookingId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
   	   							// For Nested APIs
			/* $navPropName */
const SetBookingChargesJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.ChargeId;
        let method = "POST";
        let url = `${serverApi}Charges`;
        if (input.ChargeId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Charges(${id})`;
        } else if (input.ChargeId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Charges(${id})`;
        }

        delete input['ChargeId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.ChargeId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetBookingChargesJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Charges(${id})`;
        if (filter) {
            url = `${serverApi}Charges?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            	   	   	   	   	   							// For Nested APIs
			/* $navPropName */
const SetBookingSelected_Insurance_PlansJoin = async (input) => {     return new Promise(async (resolve) => {
        let id = input.InsuranceId;
        let method = "POST";
        let url = `${serverApi}Insurances`;
        if (input.InsuranceId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Insurances(${id})`;
        } else if (input.InsuranceId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Insurances(${id})`;
        }

        delete input['InsuranceId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.InsuranceId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetBookingSelected_Insurance_PlansJoin = async (id, filter) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Insurances(${id})`;
        if (filter) {
            url = `${serverApi}Insurances?$filter=${filter}`;
        }

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json?.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

		            // Collection type media type functions are same as collection type non-media type functions as they are just join tables
            	   	   		
	
	    
	 	
	
		
/* Packages */

const GetPackagesCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}Packages/$count`;
        if (query) url = `${serverApi}Packages/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetPackagesMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Packages`;
        if (query) url = `${serverApi}Packages?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetPackageSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}Packages(${id})`;
        if (params) {
            url = `${serverApi}Packages(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetPackageSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.CmId;
        let method = "POST";
        let url = `${serverApi}Packages`;
        if (input.CmId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}Packages(${input.CmId})`;
        } else if (input.CmId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}Packages(${input.CmId})`;
        }

        delete input['CmId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.CmId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
	 	
	
		
/* PickupDropLocations */

const GetPickupDropLocationsCount = async (query) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}PickupDropLocations/$count`;
        if (query) url = `${serverApi}PickupDropLocations/$count?${query}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || 0 });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    })
}

const GetPickupDropLocationsMulti = async (query, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}PickupDropLocations`;
        if (query) url = `${serverApi}PickupDropLocations?${query}`;

        if (expands && query) url = `${url}&$expand=${expands}`;
        if (expands && !query) url = `${url}?$expand=${expands}`;
        
        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const GetPickupDropLocationSingle = async (id, params, expands) => {     return new Promise(async (resolve) => {

        let url = `${serverApi}PickupDropLocations(${id})`;
        if (params) {
            url = `${serverApi}PickupDropLocations(${id})?${params}`;
        }
        if (expands) url = params ? `${url}&$expand=${expands}` : `${url}?&$expand=${expands}`;
        
        try {
			const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json || [] });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

const SetPickupDropLocationSingle = async (input) => {     return new Promise(async (resolve) => {
        let id = input.PdLocId;
        let method = "POST";
        let url = `${serverApi}PickupDropLocations`;
        if (input.PdLocId && !input.Deleted) {
            method = "PATCH";
            url = `${serverApi}PickupDropLocations(${input.PdLocId})`;
        } else if (input.PdLocId && input.Deleted) {
            method = "DELETE";
            url = `${serverApi}PickupDropLocations(${input.PdLocId})`;
        }

        delete input['PdLocId'];
        delete input['Deleted'];

        try {
            const res = await fetch(url, {
                method, body: JSON.stringify(input),
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.PdLocId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
     
	        	
	
	
	    
           
 	
     


/* Document */ 
const SetDocumentSingleMedia = async (input, headers) => {     return new Promise(async (resolve) => {
        let id = headers.DocId;
        let method = "POST";
        let url = `${serverApi}Documents`;
                                                                delete headers['DocId'];
        delete headers['Deleted'];

        const formData = new FormData();
        formData.append('file', input);

        try {
            const res = await fetch(url, {
                method, body: formData,
                headers: {
                    ...headers
                }
            });

            if (res.status === 201) {
                const json = await res.json();
                return resolve({ status: res.ok, id: json.DocId });
            } else if (res.status === 200 || res.status === 204) {
                return resolve({ status: res.ok, id });
            } else {
                const json = await res.json();
                return resolve({ status: false, statusText: json.error.message });
            }

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}
const GetDocumentSingleMedia = async (id, value, type) => {     return new Promise(async (resolve) => {
        let url = `${serverApi}Documents(${id})`;
        if (value) {
            url = `${serverApi}Documents(${id})/$value`;
        }

        try {
            const res = await fetch(url, {
                method: "GET"
            });

            if (res.status === 200) {
                let data = null;
                if (value) {
                    data = await res.text();
                    if (!Helper.IsNullValue(data)) {
                        if (data.startsWith("data:")) {
                            data = data.substring(data.indexOf('data:'));
                        } else {
                            let tmp = data.split('\r\n');
                            for (let img of tmp) {
                                if (img.startsWith("data:")) data = img;
                            }
                        }
                    }
                    return resolve({ status: res.ok, values: data });
                }
                data = await res.json();
                return resolve({ status: res.ok, values: data });
            }
            return resolve({ status: false, statusText: "Failed fetching data" });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

     
	        	
	
	
 


// Below is a reference function - a possible business logic for ecom reference app
const GetProductStatus = async (productId) => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings?$filter=ProductId eq ${productId}`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                let _tmp = { Status: '' };
                if (json.value && json.value.length > 0) {
                    _tmp = json.value[0];
                }
                return resolve({ status: res.ok, values: _tmp });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}




const GetMetaData = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}$metadata`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });
            if (res.status === 200) {
                const values = await res.text();
                return resolve({ status: res.ok, values });
            }

            return resolve({ status: false, statusText: "Failed fetching data" });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

/* Prodict List View Details */
const GetProductOnBoardings = async () => {
    return new Promise(async (resolve) => {
        let url = `${serverApi}ProductOnBoardings`;

        try {
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            });

            const json = await res.json();
            if (res.status === 200) {
                return resolve({ status: res.ok, values: json.value });
            }

            return resolve({ status: false, statusText: json.error.message });

        } catch (error) {
            console.log(error);
            return resolve({ status: false, statusText: error.message });
        }
    });
}

export {
 GetEntityInfo,  GetVehiclesCount, GetVehiclesMulti, GetVehicleSingle, SetVehicleSingle, SetVehicleOtherImagesJoin, GetVehicleOtherImagesJoin, SetVehicleOffered_PackagesJoin, GetVehicleOffered_PackagesJoin, SetVehicleOffered_Insurance_PlansJoin, GetVehicleOffered_Insurance_PlansJoin, GetInsurancesCount, GetInsurancesMulti, GetInsuranceSingle, SetInsuranceSingle, GetModelsCount, GetModelsMulti, GetModelSingle, SetModelSingle, GetChargesCount, GetChargesMulti, GetChargeSingle, SetChargeSingle, GetBookingsCount, GetBookingsMulti, GetBookingSingle, SetBookingSingle, SetBookingChargesJoin, GetBookingChargesJoin, SetBookingSelected_Insurance_PlansJoin, GetBookingSelected_Insurance_PlansJoin, GetPackagesCount, GetPackagesMulti, GetPackageSingle, SetPackageSingle, GetPickupDropLocationsCount, GetPickupDropLocationsMulti, GetPickupDropLocationSingle, SetPickupDropLocationSingle, SetDocumentSingleMedia, GetDocumentSingleMedia, GetProductStatus, GetMetaData, GetProductOnBoardings
};