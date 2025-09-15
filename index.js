const page_states = {
    current_state: {
        page: 'default',
        page_id: -1
    },
    previous_state: {
        page: 'default',
        page_id: -1
    }
};

$(document).ready(function() {
    const storedPageState = JSON.parse(sessionStorage.getItem("pageState"));
    // Check if page is refreshed while in-use. Initialize new session if not.
    if (storedPageState){
        // Load saved state.
        load_page(storedPageState.current_state.page, storedPageState.current_state.page_id);

        console.log("Current session restored from session storage.")
    } else {
        // Initialize web-page (first load)
        // Set initial page_state
        history.replaceState(page_states,'',"");

        console.log('Initial history state set:', history.state);

        // Add listener for popstate events.
        window.addEventListener("popstate", (event) => {
            if (event.state) {
                load_page(page_states.previous_state.page, page_states.previous_state.page_id);
            }
        })
        // Initialize default page.
        load_page("feeding_schedule", 1);
    }
})


// Initialize buttons.
const nav_buttons = document.querySelectorAll(".nav-button");

nav_buttons.forEach(button => {
    button.addEventListener('click', function() {
        open_page(button.id);
    })
})


function open_page(feature_to_select) {
    switch(feature_to_select){
        case "feeding-schedule-button":
            // $("#head").load("feeding_schedule.html #head");
            // $("#main-body").load("feeding_schedule.html #main-body");
            // window.history.pushState({page: 'feeding-schedule', page_id: "1"}, "", "/feeding_schedule.html");
            // console.log("History state changed:", history.state);
            load_page("feeding_schedule", 1);
            return false;
        default:
            console.log("Error!");
            return true;
    }
    return false;
}

function load_page(page_name, page_id){
    // Save current page state as previous.
    page_states.previous_state.page = history.state.page;
    page_states.previous_state.page_id = history.state.page_id;

    // Load new pages.
    $("#head").load(page_name + ".html #changeable-head");
    $("#main-body").load(page_name + ".html #main-body");

    // Save the new page states as current.
    window.history.pushState({page: page_name, page_id: page_id}, "");
    page_states.current_state.page = page_name;
    page_states.current_state.page_id = page_id;

    // Save states to session storage.
    sessionStorage.setItem("pageState", JSON.stringify(page_states));

    // Print to log for debug.
    console.log("History state changed:", history.state);
}