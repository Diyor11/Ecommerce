const getProductReviewsSummary = reviews => {
    let ratingSummary = [{ 5: 0 }, { 4: 0 }, { 3: 0 }, { 2: 0 }, { 1: 0 }];
    let totalRatings = 0;
    let totalReviews = 0;
    let totalSummary = 0;
  
    if (reviews.length > 0) {
      reviews.forEach((item, i) => {
        totalRatings += item.rating;
        totalReviews += 1;
  
        switch (Math.round(item.rating)) {
          case 5:
            ratingSummary[0][5] += 1;
            totalSummary += 1;
            break;
          case 4:
            ratingSummary[1][4] += 1;
            totalSummary += 1;
  
            break;
          case 3:
            ratingSummary[2][3] += 1;
            totalSummary += 1;
  
            break;
          case 2:
            ratingSummary[3][2] += 1;
            totalSummary += 1;
  
            break;
          case 1:
            ratingSummary[4][1] += 1;
            totalSummary += 1;
  
            break;
          default:
            return;
        }
      });
    }
  
    return { ratingSummary, totalRatings, totalReviews, totalSummary };
  };

export default getProductReviewsSummary