function postedBy(parent, _args, context) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

function votes(parent, _args, context) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
}

module.exports = {
  postedBy,
  votes,
};
