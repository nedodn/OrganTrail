var Organ = artifacts.require("./Organ.sol");

module.exports = function(deployer, network, accounts) {
  const [
    opo,
    donor_doctor,
    donor_signer_1,
    donor_signer_2,
    delivery_trucker,
    delivery_courier,
    recipient_a,
    recipient_b,
  ] = accounts;

  // console.log(delivery_trucker);

  deployer.deploy(Organ).then(async (instance) => {
    // await instance.addOpo(opo, {from: opo});
    // await instance.addSigner(donor_doctor, {from: opo});
    // await instance.addSigner(donor_signer_1, {from: opo});
    // await instance.addSigner(donor_signer_2, {from: opo});

    // await instance.submitOrgan(donor_doctor, "A", 12, {from: opo});
    // await instance.signSubmission(0, {from: donor_doctor});
    // await instance.signSubmission(0, {from: donor_signer_1});
    // await instance.signSubmission(0, {from: donor_signer_1});
    // await instance.mintOrgan(0, recipient_a, 1e6, {from: opo});
    // await instance.approve(delivery_trucker, 0, {from: opo});

    // await instance.submitOrgan(donor_doctor, "B", 12, {from: opo});
    // await instance.signSubmission(1, {from: donor_doctor});
    // await instance.signSubmission(1, {from: donor_signer_1});
    // await instance.signSubmission(1, {from: donor_signer_1});
    // await instance.mintOrgan(1, recipient_b, 1e6, {from: opo});
    // await instance.approve(delivery_trucker, 1, {from: opo});

    await instance.addOpo(opo, {from: opo});
    await instance.addSigner(opo, {from: opo});

    await instance.submitOrgan(opo, "A", 12, {from: opo});
    await instance.signSubmission(0, {from: opo});
    await instance.mintOrgan(0, opo, 1e6, {from: opo});
    await instance.approve(opo, 0, {from: opo});

    await instance.submitOrgan(opo, "B", 12, {from: opo});
    await instance.signSubmission(1, {from: opo});
    await instance.mintOrgan(1, opo, 1e6, {from: opo});
    await instance.approve(opo, 1, {from: opo});

    // await instance.getApproved(0).then(console.log);
  });
  // deployer.deploy(Organ)
};
