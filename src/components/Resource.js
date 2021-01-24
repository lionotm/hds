import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { listResourcess } from '../graphql/queries'
import SelectSearch from 'react-select-search'
import { onCreateResources } from '../graphql/subscriptions';
import './Resource.css';

function Resource({ setResource, setResourceTypes, resourceTypes, setLocations, locations }) {
  const [resources, setResources] = useState([]);
  //const [locations, setLocations] = useState("");
  //const [resourceTypes, setResourceTypes] = useState("");
  //const [resource, setResource] = useState("");
  const [resourceFilter, setResourceFilter] = useState([]);



  // Get all resources
  useEffect(() => {
    const getResources = async () => {
      const result = await API.graphql(graphqlOperation(listResourcess));
      setResources(result.data.listResourcess.items)
      // console.log("All Resources", result.data.listResourcess.items);
    }
    getResources();
  }, []);


  // Update resource selection after Area or Resource Type is chosen
  useEffect(() => {
    const getResourceType = async () => {
      const result = await API.graphql(graphqlOperation(listResourcess, {
        filter: {
          locationName: {
            contains: locations
          },
          resourceType: {
            contains: resourceTypes
          }
        }
      }));
      const result2 = result.data.listResourcess.items;
      setResourceFilter(result2.map(a => a.name))
    }
    getResourceType();

  }, [locations, resourceTypes])

  // Subscriptions update when new resource is created
  useEffect(() => {
    const createResourceListener = API.graphql(graphqlOperation(onCreateResources))
      .subscribe({
        next: resourceData => {
          setResources(resourceData)
        }
      })
    return () => {
      //clean up subscription
      createResourceListener.unsubscribe()
    }
  })


  // Get Unique values
  let uniqueAreas = [...new Set(resources.map(item => item.locationName))]
  let uniqueResourceType = [...new Set(resources.map(item => item.resourceType))]

  return (
    <>
      <h2>Step 1: </h2>
      <div className="cards__container">
        <div className="cards__wrapper">
          <p>Select an Area</p>
          <div className="dropdown">
            <SelectSearch
              options={uniqueAreas.map(area => {
                return ({
                  value: area,
                  name: area
                })
              })}
              placeholder="Choose a Location"
              //printOptions="always"
              search
              emptyMessage="Not found"
              onChange={setLocations}
            />
          </div>
        </div>

        <div className="cards__wrapper">
          <p className="desc">Select a Resource Type</p>
          <div className="dropdown">
            <SelectSearch
              options={uniqueResourceType.map(type => {
                return ({
                  value: type,
                  name: type
                })
              })}
              placeholder="Choose a Resource Type"
              //printOptions="always"
              search
              emptyMessage="Not found"
              onChange={setResourceTypes}
            />
          </div>
        </div>

        <div className="cards__wrapper">
          <p>Select a Resource</p>
          <div className="dropdown">
            <SelectSearch
              options={resourceFilter.map(type => {
                return ({
                  value: type,
                  name: type
                })
              })}
              placeholder="Choose a Resource"
              //printOptions="always"
              search
              emptyMessage="Not found"
              onChange={setResource}
            />
          </div>
        </div>
      </div>
    </>

  )
}

export default Resource
