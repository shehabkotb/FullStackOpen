describe("blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    cy.request("POST", "http://localhost:3001/api/users", {
      username: "root",
      name: "adminUser",
      password: "sekret"
    })
    cy.visit("http://localhost:3000")
  })

  it("hello test", function () {
    cy.contains("log in to application")
    cy.get("form").should("contain", "username").and("contain", "password")
  })

  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("root")
      cy.get("#password").type("sekret")
      cy.get("form").submit()

      cy.contains("adminUser is logged in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("notCorrect")
      cy.get("#password").type("sekret")
      cy.get("form").submit()

      cy.contains("Wrong user name or password")
      cy.get(".alert").should(
        "have.css",
        "background-color",
        "rgb(244, 67, 54)"
      )
    })
  })

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "root", password: "sekret" })
    })

    it("A blog can be created", function () {
      cy.contains("New Blog").click()
      cy.get("#title").type("new test blog")
      cy.get("#author").type("jacob morris")
      cy.get("#url").type("test-url")

      cy.get("form").submit()
      cy.contains("new test blog jacob morris")
    })

    describe("with a blog created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "new test blog",
          author: "jacob morris",
          url: "test-url"
        })
      })
      it("like a blog", function () {
        cy.contains("view").click()
        cy.get(".likes-div").contains("like").click()

        cy.contains("Likes: 1")
      })

      it("user who created blog can delete it", function () {
        cy.contains("view").click()
        cy.contains("remove").click()

        cy.contains("new test blog jacob morris").should("not.exist")
      })
    })
    describe("with a lot of blogs created", function () {
      beforeEach(function () {
        cy.createBlog({
          title: "blog 1",
          author: "jacob morris",
          url: "test-url",
          likes: 10
        })
        cy.createBlog({
          title: "blog 2",
          author: "jacob morris",
          url: "test-url",
          likes: 9
        })
        cy.createBlog({
          title: "blog 3",
          author: "jacob morris",
          url: "test-url",
          likes: 8
        })
        cy.createBlog({
          title: "blog 4",
          author: "jacob morris",
          url: "test-url",
          likes: 7
        })
        cy.createBlog({
          title: "blog 5",
          author: "jacob morris",
          url: "test-url",
          likes: 3
        })
      })

      it("blogs are sorted on likes", function () {
        cy.get(".Blog-div").each(($el) => {
          cy.wrap($el).contains("view").click()
        })

        let lastLike = null
        cy.get(".likes-div").each(($el) => {
          let currentLike = parseInt($el.text().match(/\d+/)[0])

          if (lastLike === null) {
            lastLike = currentLike
          } else {
            expect(lastLike).to.be.at.least(currentLike)
            lastLike = currentLike
          }
        })
      })
    })
  })
})
