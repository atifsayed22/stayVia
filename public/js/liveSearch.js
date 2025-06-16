document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname === "/listing" || window.location.pathname === "/listing/filters") {

        const form = document.querySelector("#filter-form");
        const listingContainer = document.querySelector(".row.justify-content-center");

        if (!form || !listingContainer) return;
        
        const debounce = (func, delay = 500) => {
          let timeout;
          return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
          };
        };
        
        const fetchListings = async () => {
          const params = new URLSearchParams(new FormData(form));
          const res = await fetch(`/listing/filters?${params.toString()}`, {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
            },
          });
        
          const data = await res.json();
          listingContainer.innerHTML = "";
        
          if (!data.listings.length) {
            listingContainer.innerHTML = `<p class="text-center text-muted">No results found.</p>`;
            return;
          }
        
          for (const listing of data.listings) {
            let ratingHTML = "";
          
            if (listing.avgRating) {
              const avg = Number(listing.avgRating);
              const fullStars = Math.floor(avg);
              const halfStar = avg % 1 >= 0.5;
              const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
          
              for (let i = 0; i < fullStars; i++) {
                ratingHTML += `<i class="bi bi-star-fill text-warning"></i>`;
              }
              if (halfStar) {
                ratingHTML += `<i class="bi bi-star-half text-warning"></i>`;
              }
              for (let i = 0; i < emptyStars; i++) {
                ratingHTML += `<i class="bi bi-star text-warning"></i>`;
              }
          
              ratingHTML += `<span class="ms-1 fw-semibold text-dark" title="${avg} out of 5">${avg.toFixed(1)}</span>`;
            } else {
              ratingHTML = `<span class="text-muted small fst-italic">No ratings</span>`;
            }
          
            listingContainer.innerHTML += `
              <div class="col-6 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="custom-card h-100">
                  <a href="/listing/${listing._id}" class="text-decoration-none">
                    <img src="${listing.image.url}" class="card-img-top custom-card-img" alt="Listing image" />
                    <div class="p-2">
                      <h6 class="fw-semibold text-dark text-truncate">${listing.title}</h6>
                      <p class="mb-1 text-muted small">
                        <i class="bi bi-geo-alt-fill"></i> ${listing.location}, ${listing.country}
                      </p>
                      <p class="d-inline-flex align-items-center gap-1 mb-2 small text-muted">
                        ${ratingHTML}
                      </p>
                      <p class="text-success fw-semibold mb-2 small">₹ ${Number(listing.price).toLocaleString("en-IN")} / Night</p>
                    </div>
                  </a>
                </div>
              </div>
            `;
          }
          
          
        };
        
        form.addEventListener("input", debounce(fetchListings));
}

  });
  