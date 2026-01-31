from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to contact page
        url = "http://localhost:3003/Ceylon-Travel-Hub/contact"
        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for form to appear
        page.wait_for_selector("form")

        # Take screenshot of initial state
        page.screenshot(path="/home/jules/verification/contact_initial.png")
        print("Initial screenshot taken")

        # Click submit button to trigger validation
        # I use exact text match
        submit_btn = page.get_by_role("button", name="Send Message")
        submit_btn.click()

        # Wait a bit for validation to show
        page.wait_for_timeout(1000)

        # Take screenshot of validation state
        page.screenshot(path="/home/jules/verification/contact_validation.png")
        print("Validation screenshot taken")

        browser.close()

if __name__ == "__main__":
    run()
