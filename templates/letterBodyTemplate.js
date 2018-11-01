function letterBodyTemplate(textMessage) {
  const str = `
  <section>
    <p>${textMessage}</p>
    <div class="buttons-for-answer">
      <button type="button" style="color: #fff;background-color: #007bff;margin-right: 15px";>Accept</button>
      <button type="button" style="color: #fff;background-color: #dc3545;margin-right: 15px";>Decline</button>
      <button type="button" style="color: #212529;background-color: #ffc107;margin-right: 15px">Needs to be discussed</button>
    </div>
  </section>
                `;
 return str;
};

module.exports = letterBodyTemplate;
