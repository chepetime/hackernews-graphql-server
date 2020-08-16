function feed(_parent, _args, context, _info) {
  return context.prisma.link.findMany();
}

module.exports = {
  feed,
};
