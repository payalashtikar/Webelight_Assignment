import React, { useEffect, useState } from "react";
import './StarRepo.css'
const StarRepo = () => {

  const [showRepoList, setShowRepoList] = useState([])

  useEffect(() => {
    // const url ="https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"


    const getdata = async () => {
      const countDays = new Date();
      console.log(countDays, "current");
      
      // Clone the countDays date object before modifying it to avoid side effects
      const last30daysDate = new Date(countDays);
      last30daysDate.setDate(last30daysDate.getDate() - 30);
      console.log(last30daysDate, "last");
      
      // Format the dates as "YYYY-MM-DD"
      const currentDateFormatted = countDays.toISOString().split('T')[0];
      const last30daysFormatted = last30daysDate.toISOString().split('T')[0];
      
      console.log(currentDateFormatted, "current formatted");
      console.log(last30daysFormatted, "last formatted");

      // 
      
      try {
        const url = "https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc"
        // const url ="https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=2"
        const response = await fetch(url);
        const data = await response.json()
        console.log(data)
        setShowRepoList(data.items)
      }
      catch (error) {
        alert("Error :: ", error)
      }
    }
    getdata();
  }, [])

  return (
    <div className="repo-container">
      <h2>Star Repository List</h2>
      <ul>
        {showRepoList && showRepoList.map((val, i) => {
          return (
            <li key={val.id}>
     {/* {val.created_at} */}

              <a href={val.starred_url} target="_blank" >
                {val.name}
              </a>
              {val.description}
              {val.stargazers_count}
              
            </li>
          )
        })}

      </ul>
    </div>
  );
};

export default StarRepo;
